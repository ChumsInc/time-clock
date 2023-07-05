import {combineReducers} from "redux";
import {BannerImage} from "../../types";
import {ActionInterface, ActionPayload, fetchJSON} from "chums-ducks";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {API_PATH_BANNERS} from "../../constants";
import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {fetchBanners} from "../../api/banners";

export interface BannerPayload extends ActionPayload {
    banners?: BannerImage[]
}

export interface BannerAction extends ActionInterface {
    payload?: BannerPayload
}

export interface BannerThunkAction extends ThunkAction<any, RootState, unknown, BannerAction> {
}

const bannersFetchRequested = 'banners/fetchRequested';
const bannersFetchSucceeded = 'banners/fetchSucceeded';
const bannersFetchFailed = 'banners/fetchFailed';

export interface BannersState {
    list: BannerImage[];
    loading: boolean;
    loaded: boolean;
}

const initialState:BannersState = {
    list: [],
    loading: false,
    loaded: false,
}

export const fetchBannersAction = (): BannerThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectBannerLoading(state)) {
                return;
            }
            dispatch({type: bannersFetchRequested});
            const {banners} = await fetchJSON(API_PATH_BANNERS);
            dispatch({type: bannersFetchSucceeded, payload: {banners}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("fetchBannersAction()", error.message);
                return dispatch({type: bannersFetchFailed, payload: {error, context: bannersFetchRequested}})
            }
            console.error("fetchBannersAction()", error);
        }
        const {banner} = getState();
        if (banner.loading) {
            return;
        }
    }

export const loadBanners = createAsyncThunk<BannerImage[]>(
    'banners/load',
    async () => {
        return await fetchBanners();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !selectBannerLoading(state);
        }
    }
)

export const selectBannerList = (state: RootState) => state.banners.list;
export const selectBannerLoading = (state: RootState) => state.banners.loading;
export const selectBannersLoaded = (state:RootState) => state.banners.loaded;

const bannersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadBanners.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadBanners.fulfilled, (state, action) => {
            state.loading = false;
            state.loaded = true;
        })
        .addCase(loadBanners.rejected, (state) => {
            state.loading = false;
        })
})

export default bannersReducer;
