import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {loadBanners} from "@/ducks/banners/actions";
import {BannerImage} from "chums-types";

export const bannersAdapter = createEntityAdapter<BannerImage, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
});

const bannersSelectors = bannersAdapter.getSelectors();

export interface AdditionalBannerState {
    status: 'idle' | 'loading' | 'rejected';
}

const initialState: AdditionalBannerState = {
    status: 'idle',
}

const bannersSlice = createSlice({
    name: "banners",
    initialState: bannersAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadBanners.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loadBanners.fulfilled, (state, action) => {
                state.status = 'idle'
                bannersAdapter.setAll(state, action.payload ?? []);
            })
            .addCase(loadBanners.rejected, (state) => {
                state.status = 'rejected'
            })
    },
    selectors: {
        selectAllBanners: (state) => bannersSelectors.selectAll(state),
        selectBannersStatus: (state) => state.status,
    }
});

export const {selectAllBanners, selectBannersStatus} = bannersSlice.selectors
export default bannersSlice;
