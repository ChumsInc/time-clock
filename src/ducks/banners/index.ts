import {combineReducers} from "redux";
import {BannerImage} from "../../types";
import {ActionInterface, ActionPayload, fetchJSON} from "chums-ducks";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {API_PATH_BANNERS} from "../../constants";

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

export const selectBannerList = (state: RootState) => state.banners.list;
export const selectBannerLoading = (state: RootState) => state.banners.loading;
export const selectBannersLoaded = (state:RootState) => state.banners.loaded;

const listReducer = (state: BannerImage[] = [], action: BannerAction): BannerImage[] => {
    const {type, payload} = action;
    switch (type) {
    case bannersFetchSucceeded:
        if (payload?.banners) {
            return [...payload.banners];
        }
        return state;
    default:
        return state;
    }
}

const loadingReducer = (state: boolean = false, action: BannerAction): boolean => {
    switch (action.type) {
    case bannersFetchRequested:
        return true;
    case bannersFetchSucceeded:
    case bannersFetchFailed:
        return false;
    default:
        return state;
    }
}

const loadedReducer = (state: boolean = false, action: BannerAction): boolean => {
    switch (action.type) {
    case bannersFetchSucceeded:
        return true;
    case bannersFetchRequested:
    case bannersFetchFailed:
        return false;
    default:
        return state;
    }
}

export default combineReducers({
    list: listReducer,
    loading: loadingReducer,
    loaded: loadedReducer,
});
