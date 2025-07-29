import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {alertsSlice} from "@chumsinc/alert-list";
import bannersSlice from "@/ducks/banners";
import payPeriodsSlice from '@/ducks/payPeriods';
import userSlice from "@/ducks/user";
import entriesSlice from "@/ducks/entries";
import versionSlice from "@/ducks/version";

const rootReducer = combineReducers({
    [alertsSlice.reducerPath]: alertsSlice.reducer,
    [bannersSlice.reducerPath]: bannersSlice.reducer,
    [entriesSlice.reducerPath]: entriesSlice.reducer,
    [payPeriodsSlice.reducerPath]: payPeriodsSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [versionSlice.reducerPath]: versionSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.error'],
        }
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
