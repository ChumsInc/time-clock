import {combineReducers} from 'redux';
import {FETCH_CLOCK_USER, FETCH_SUCCESS, SELECT_PAY_PERIOD} from "../constants";

const list = (state = [], action) => {
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

const selected = (state = {}, action) => {
    const {type, payPeriod} = action;
    switch (type) {
    case SELECT_PAY_PERIOD:
        return {...payPeriod};
    default:
        return state;
    }
};


export default combineReducers({
    list,
    selected,
})
