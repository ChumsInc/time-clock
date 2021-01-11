import {combineReducers} from 'redux';
import banner from "./banner";
import app from "./app";
import user from "./user";
import payPeriod from './pay-period';

export default combineReducers({
    app,
    banner,
    user,
    payPeriod,
})
