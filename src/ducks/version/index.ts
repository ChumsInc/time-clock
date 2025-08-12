import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {fetchJSON} from "@chumsinc/ui-utils";
import type {RootState} from "@/app/configureStore";
import {selectEmployee} from "@/ducks/user";
import dayjs from "dayjs";

export interface VersionState {
    status: 'idle' | 'loading',
    version: string | null;
    available: string | null;
    timeLoaded: string;
    timeChecked: string|null;
}

const initialState: VersionState = {
    status: 'idle',
    version: null,
    available: null,
    timeLoaded: dayjs().toJSON(),
    timeChecked: null,
}
const versionSlice = createSlice({
    name: "version",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadVersion.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadVersion.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    if (!state.version) {
                        state.version = action.payload.version;
                    }
                    state.available = action.payload.version;
                    state.timeChecked = action.payload.timeChecked ?? null;
                }
            })
            .addCase(loadVersion.rejected, (state) => {
                state.status = 'idle';
            })
    },
    selectors: {
        selectVersion: (state) => state.version,
        selectNextVersion: (state) => state.available,
        selectUpdateAvailable: (state) => !!state.version && state.available !== state.version,
        selectVersionStatus: (state) => state.status,
        selectTimeLoaded: (state) => state.timeLoaded,
        selectTimeChecked: (state) => state.timeChecked,
    }
});

export const {
    selectNextVersion,
    selectVersionStatus,
    selectVersion,
    selectUpdateAvailable,
    selectTimeLoaded,
    selectTimeChecked,
} = versionSlice.selectors;

interface FetchVersionResponse {
    name: string;
    version: string;
    timeChecked?: string;
}

async function fetchVersion(): Promise<FetchVersionResponse | null> {
    try {
        const url = './package.json';
        const res = await fetchJSON<FetchVersionResponse>(url, {cache: 'no-cache'});
        if (!res) {
            return null
        }
        return {
            name: res.name,
            version: res.version,
            timeChecked: dayjs().toJSON(),
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchVersion()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchVersion()", err);
        return Promise.reject(new Error('Error in fetchVersion()'));
    }
}

export const loadVersion = createAsyncThunk<FetchVersionResponse | null, void, { state: RootState }>(
    'version/load',
    async () => {
        return await fetchVersion();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectVersionStatus(state) === 'idle';
        }
    }
)

export const selectShouldReload = createSelector(
    [selectTimeLoaded, selectTimeChecked, selectVersionStatus, selectEmployee,],
    (timeLoaded, timeChecked, status, employee, ) => {
        return dayjs(timeChecked).diff(timeLoaded, 'hours') > 12
            && !employee
            && status === 'idle';
    }
)

export default versionSlice;
