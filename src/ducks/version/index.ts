import {RootState} from "../index";
import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {fetchVersion} from "../../api/version";


export interface VersionState {
    current: string | null;
    loading: boolean;
    available: string | null;
}

export const initialState: VersionState = {
    current: null,
    loading: false,
    available: null,
}

export const versionFetchRequested = 'version/fetchRequested';
export const versionFetchSucceeded = 'version/fetchSucceeded';
export const versionFetchFailed = 'version/fetchFailed';


export const selectVersion = (state: RootState): string => state.version.current;
export const selectUpdateAvailable = (state: RootState): boolean => !!state.version.current && state.version.available > state.version.current;
export const selectVersionLoading = (state: RootState): boolean => state.version.loading;

export const loadVersion = createAsyncThunk<string | null>(
    'version/load',
    async () => {
        return await fetchVersion();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !state.version.loading;
        }
    }
)
const versionReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadVersion.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadVersion.fulfilled, (state, action) => {
            state.loading = false;
            if (!state.current && action.payload) {
                state.current = action.payload;
            }
            state.available = action.payload;
        })
        .addCase(loadVersion.rejected, (state) => {
            state.loading = false;
        })
});

export default versionReducer;
