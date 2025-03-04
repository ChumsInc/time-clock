import {combineReducers} from "redux";
import bannersReducer from "../ducks/banners";
import {default as userReducer} from '../ducks/user/index'
import {default as payPeriodReducer} from '../reducers/pay-period'
import {default as payPeriodsReducer} from '../ducks/payPeriods'
import {default as versionReducer} from '../ducks/version/index';
import {asyncThunkCreator, buildCreateSlice, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import alertsReducer from "../ducks/alerts";


export const rootReducer = combineReducers({
    alerts: alertsReducer,
    banners: bannersReducer,
    user: userReducer,
    payPeriod: payPeriodReducer,
    payPeriods: payPeriodsReducer,
    version: versionReducer,
});


const store = configureStore({
    reducer: rootReducer,
});

export const createAppSlice = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator},
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
