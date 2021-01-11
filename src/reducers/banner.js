import {combineReducers} from 'redux';
import {FETCH_BANNERS, FETCH_INIT, FETCH_SUCCESS} from "../constants";

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_BANNERS:
        return status === FETCH_INIT;
    default:
        return state;
    }
};

const list = (state = [], action) => {
    const {type, status, list} = action;
    switch (type) {
    case FETCH_BANNERS:
        if (status === FETCH_SUCCESS) {
            return [...list];
        }
        return state;
    default:
        return state;
    }
};


export default combineReducers({
    loading,
    list,
});
