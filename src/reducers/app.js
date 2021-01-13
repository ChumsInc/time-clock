import {combineReducers} from 'redux';
import {
    CLEAR_USER,
    DISMISS_ALERT,
    FETCH_CLOCK_USER,
    FETCH_FAILURE,
    FETCH_SUCCESS, FETCH_VERSION,
    SET_ALERT,
    SET_TAB,
    TABS
} from "../constants";

import packageJSON from '../../package.json';

export const now = () => new Date().valueOf();

const alertSort = (a, b) => a.id - b.id;

const alerts = (state = [], action) => {
    const {type, props, id} = action;
    switch (type) {
    case SET_ALERT:
        if (!!props.context) {
            const [{id = now(), count = 0} = {}] = state.filter(a => a.context === props.context);
            return [
                ...state.filter(a => a.context !== props.context),
                {...props, id, count: count + 1}
            ].sort(alertSort);
        }
        return [...state, {...props, count: 1, id: now()}].sort(alertSort);
    case DISMISS_ALERT:
        return [...state.filter(alert => alert.id !== id)];
    default:
        return state;
    }
};

const tab = (state = 'clock', action) => {
    const {type, tab} = action;
    switch (type) {
    case SET_TAB:
        return tab;
    case CLEAR_USER:
        return 'clock';
    default:
        return state;
    }
};

const payPeriods = (state = [], action) => {
    const {type, status, periods} = action;
    switch (type) {
    case FETCH_CLOCK_USER:
        if (status === FETCH_SUCCESS) {
            return [...periods]
        }
        return state;
    default:
        return state;
    }
};




const version = (state = packageJSON.version || '', action) => {
    const {type, status, version} = action;
    switch (type) {
    case FETCH_VERSION:
        if (status === FETCH_SUCCESS) {
            return version;
        }
        return state;
    default:
        return state;
    }
};


export default combineReducers({
    alerts,
    tab,
    payPeriods,
    version,
})
