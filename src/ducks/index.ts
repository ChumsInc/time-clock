import {combineReducers} from "redux";
import {default as appReducer} from '../reducers/app'
import {default as bannerReducer} from '../reducers/banner'
import {default as bannersReducer} from './banners'
import {default as userReducer} from './user'
import {default as payPeriodReducer} from '../reducers/pay-period'
import {default as payPeriodsReducer} from './payPeriods'
import {default as versionReducer} from './version';

const rootReducer = combineReducers({
    app: appReducer,
    banner: bannerReducer,
    banners: bannersReducer,
    user: userReducer,
    payPeriod: payPeriodReducer,
    payPeriods: payPeriodsReducer,
    version: versionReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
