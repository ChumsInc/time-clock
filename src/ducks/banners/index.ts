import {BannerImage} from "../../types";
import {createEntityAdapter, createReducer, createSlice} from "@reduxjs/toolkit";
import {loadBanners} from "./actions";

const bannersAdapter = createEntityAdapter<BannerImage, number>({
    selectId: (banner) => banner.id,
    sortComparer: (a, b) => a.id - b.id,
})

const bannerAdapterSelectors = bannersAdapter.getSelectors();

interface BannersExtraState {
    status: 'idle'|'loading'|'rejected';
}

const initialState:BannersExtraState = {
    status: 'idle',
}

const bannersSlice = createSlice({
    name: 'banners',
    initialState: bannersAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadBanners.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loadBanners.fulfilled, (state, action) => {
                state.status = 'idle'
                bannersAdapter.setAll(state, action.payload);
            })
            .addCase(loadBanners.rejected, (state) => {
                state.status = 'rejected'
            })
    },
    selectors: {
        selectBannersStatus: (state) => state.status,
        selectAllBanners: (state) => bannerAdapterSelectors.selectAll(state)
    }
});

export const {selectBannersStatus, selectAllBanners} = bannersSlice.selectors;

export default bannersSlice;
