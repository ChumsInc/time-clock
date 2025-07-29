import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchJSON} from "@chumsinc/ui-utils";
import type {RootState} from "@/app/configureStore";

export interface VersionState {
    status: 'idle' | 'loading',
    version: string | null;
    available: string | null;
}

const initialState: VersionState = {
    status: 'idle',
    version: null,
    available: null,
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
                        state.version = action.payload;
                    }
                    state.available = action.payload;
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
    }
});

export const {selectNextVersion, selectVersionStatus, selectVersion, selectUpdateAvailable} = versionSlice.selectors;

interface FetchVersionResponse {
    name: string;
    version: string;
}

async function fetchVersion(): Promise<string | null> {
    try {
        const url = './package.json';
        const res = await fetchJSON<FetchVersionResponse>(url, {cache: 'no-cache'});
        return res?.version ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchVersion()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchVersion()", err);
        return Promise.reject(new Error('Error in fetchVersion()'));
    }
}

export const loadVersion = createAsyncThunk<string | null, void, { state: RootState }>(
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

export default versionSlice;
