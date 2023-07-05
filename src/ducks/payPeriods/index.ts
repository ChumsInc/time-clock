import {PayPeriod} from "../../types";
import {clearUser, loadUserInfo, selectEmployee} from "../user";
import {RootState} from "../index";
import {createReducer} from "@reduxjs/toolkit";

export interface PayPeriodsState {
    list: PayPeriod[];
    loading: boolean;
}

const initialState: PayPeriodsState = {
    list: [],
    loading: false,
}

export const payPeriodsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadUserInfo.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload?.periods ?? [];
        })
        .addCase(loadUserInfo.rejected, (state) => {
            state.loading = false;
        })
        .addCase(clearUser, (state) => {
            state.list = [];
        })
});

export const selectClosedPayPeriods = (state: RootState) => {
    const employee = selectEmployee(state);
    if (!employee) {
        return [];
    }

    const hireDate = new Date(employee.HireDate).valueOf() / 1000;
    return state.payPeriods
        .list
        .filter(pp => pp.completed)
        .filter(pp => pp.EndDate >= hireDate)
        .sort((a, b) => b.StartDate - a.StartDate)
}

export const selectOpenPayPeriods = (state: RootState) => {
    const employee = selectEmployee(state);
    if (!employee) {
        return [];
    }

    const hireDate = new Date(employee.HireDate).valueOf() / 1000;
    return state.payPeriods.list
        .filter(pp => !pp.completed)
        .filter(pp => pp.EndDate >= hireDate)
        .sort((a, b) => b.StartDate - a.StartDate)
}

export default payPeriodsReducer;
