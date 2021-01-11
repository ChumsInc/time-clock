import {combineReducers} from 'redux';
import {
    CLEAR_USER,
    FETCH_CLOCK_ACTION,
    FETCH_CLOCK_USER, FETCH_INIT,
    FETCH_SUCCESS, FETCH_USER_ACTION,
    SET_COUNTDOWN_TIMER,
    SET_LOGIN_CODE, SET_TAB
} from "../constants";

const code = (state = '', action) => {
    const {type, code, status} = action;
    switch (type) {
    case SET_LOGIN_CODE:
        return code;
    case FETCH_CLOCK_USER:
    case FETCH_CLOCK_ACTION:
    case FETCH_USER_ACTION:
        return state;
        // if (status === FETCH_INIT) {
        //     return state;
        // }
        // return '';
    case CLEAR_USER:
        return '';
    default:
        return state;
    }
};

const employee = (state = {}, action) => {
    const {type, status, employee} = action;
    switch (type) {
    case FETCH_CLOCK_USER:
    case FETCH_USER_ACTION:
    case FETCH_CLOCK_ACTION:
        if (status === FETCH_SUCCESS) {
            return {...employee};
        }
        return state;
    case CLEAR_USER:
        return {};
    default:
        return state;
    }
};

const entry = (state = {}, action) => {
    const {type, status, entry, tab} = action;
    switch (type) {
    case CLEAR_USER:
        return {};
    case FETCH_CLOCK_ACTION:
        if (status === FETCH_SUCCESS) {
            return {...entry};
        }
        return state;
    case FETCH_USER_ACTION:
    case FETCH_CLOCK_USER:
        if (status === FETCH_SUCCESS) {
            return {...entry};
        }
        return state;
    case SET_TAB:
        if (tab === 'clock') {
            return {};
        }
        return state;
    default:
        return state;
    }
};

const alert = (state = null, action) => {
    const {type, status, alert} = action;
    switch (type) {
    case FETCH_CLOCK_ACTION:
        if (status === FETCH_SUCCESS) {
            return alert;
        }
        return null;
    case CLEAR_USER:
        return null;
    default:
        return state;
    }
};

const requiresOverride = (state = false, action) => {
    const {type, status, requiresOverride} = action;
    switch (type) {
    case FETCH_CLOCK_ACTION:
        if (status === FETCH_SUCCESS) {
            return requiresOverride === true;
        }
        return false;
    case CLEAR_USER:
        return false;
    default:
        return state;
    }
};

const overrideText = (state = null, action) => {
    const {type, status, overrideText} = action;
    switch (type) {
    case FETCH_CLOCK_ACTION:
        if (status === FETCH_SUCCESS) {
            return overrideText || null;
        }
        return state;
    case CLEAR_USER:
        return null;
    default:
        return state;
    }
};

const clockActionResult = (state = null, action) => {
    const {type, status, success} = action;
    switch (type) {
    case FETCH_CLOCK_ACTION:
        if (status === FETCH_SUCCESS) {
            return success === true;
        }
        return state;
    case CLEAR_USER:
        return null;
    default:
        return state;
    }
};

const isClockedIn = (state = null, action) => {
    const {type, status, isClockedIn} = action;
    switch (type) {
    case FETCH_CLOCK_USER:
        if (status === FETCH_SUCCESS) {
            return isClockedIn;
        }
        return state;
    case CLEAR_USER:
        return null;
    default:
        return state;
    }
};

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_CLOCK_USER:
    case FETCH_USER_ACTION:
    case FETCH_CLOCK_ACTION:
        return status === FETCH_INIT;
    case CLEAR_USER:
        return false;
    default:
        return state;
    }
};



export default combineReducers({
    code,
    employee,
    entry,
    alert,
    requiresOverride,
    overrideText,
    clockActionResult,
    isClockedIn,
    loading,
})
