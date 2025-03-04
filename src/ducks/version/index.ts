import {RootState} from "../../app/configureStore";
import {createReducer} from "@reduxjs/toolkit";
import {loadVersion} from "./actions";


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
