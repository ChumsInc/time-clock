import {combineReducers} from "redux";
import {ActionInterface, ActionPayload, fetchJSON} from "chums-ducks";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {API_PATH_VERSION} from "../../constants";
import {BannerAction} from "../banners";

export interface VersionPayload extends ActionPayload {
    version?: string,
}

export interface VersionAction extends ActionInterface {
    payload?: VersionPayload,
}

export interface VersionThunkAction extends ThunkAction<any, RootState, unknown, VersionAction> {
}

export const versionFetchRequested = 'version/fetchRequested';
export const versionFetchSucceeded = 'version/fetchSucceeded';
export const versionFetchFailed = 'version/fetchFailed';

export const selectVersion = (state:RootState):string => state.version.current;
export const selectUpdateAvailable = (state:RootState):boolean => !!state.version.current && state.version.available > state.version.current;
export const selectVersionLoading = (state:RootState):boolean => state.version.loading;

export const fetchVersionAction = (): VersionThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectVersionLoading(state)) {
                return;
            }
            dispatch({type: versionFetchRequested});
            const {version} = await fetchJSON(API_PATH_VERSION, {cache: 'no-cache'});
            dispatch({type: versionFetchSucceeded, payload: {version}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("fetchVersionAction()", error.message);
                return dispatch({type: versionFetchFailed})
            }
            console.error("fetchVersionAction()", error);
        }
    }

const currentReducer = (state: string = '', action: VersionAction): string => {
    switch (action.type) {
    case versionFetchSucceeded:
        if (action.payload?.version && !state) {
            return action.payload.version;
        }
        return state;
    default:
        return state;
    }
}

const availableReducer = (state: string = '', action: VersionAction): string => {
    switch (action.type) {
    case versionFetchSucceeded:
        if (action.payload?.version) {
            return action.payload.version;
        }
        return state;
    default:
        return state;
    }
}

const loadingReducer = (state: boolean = false, action: BannerAction): boolean => {
    switch (action.type) {
    case versionFetchRequested:
        return true;
    case versionFetchSucceeded:
    case versionFetchFailed:
        return false;
    default:
        return state;
    }
}

export default combineReducers({
    current: currentReducer,
    available: availableReducer,
    loading: loadingReducer,
})
