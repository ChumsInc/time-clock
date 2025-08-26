import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import type {PayPeriodEntry} from "@/src/types";
import {clearUser} from "@/ducks/user";
import {approvePayPeriod, clockAction, getUserInfo} from "@/ducks/user/actions";
import {isClockActionSuccess, isGetUserInfoSuccessResponse} from "@/ducks/user/utils";
import {entrySorter} from "@/ducks/entries/utils.ts";

const entriesAdapter = createEntityAdapter<PayPeriodEntry, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id
})

const adapterSelectors = entriesAdapter.getSelectors();

export interface EntriesState {
    code: string;
    employeeId: number;
    payPeriodId: number;
}

const initialState: EntriesState = {
    code: '',
    employeeId: 0,
    payPeriodId: 0,
}

const entriesSlice = createSlice({
    name: 'entries',
    initialState: entriesAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(clearUser, (state) => {
                state.code = '';
                state.employeeId = 0;
                state.payPeriodId = 0;
                entriesAdapter.removeAll(state);
            })
            .addCase(clockAction.fulfilled, (state, action) => {
                if (isClockActionSuccess(action.payload)) {
                    entriesAdapter.setAll(state, [
                        ...action.payload.employee.entries,
                        ...action.payload.employee.deleted_entries
                    ])
                    return;
                }
                entriesAdapter.removeAll(state);
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                if (isGetUserInfoSuccessResponse(action.payload)) {
                    entriesAdapter.setAll(state, [
                        ...action.payload.employee.entries,
                        ...action.payload.employee.deleted_entries
                    ]);
                    return;
                }
                entriesAdapter.removeAll(state);
            })
            .addCase(approvePayPeriod.fulfilled, (state, action) => {
                if (isGetUserInfoSuccessResponse(action.payload)) {
                    entriesAdapter.setAll(state, [
                        ...action.payload.employee.entries,
                        ...action.payload.employee.deleted_entries
                    ]);
                    return;
                }
                entriesAdapter.removeAll(state);
            })
    },
    selectors: {
        selectAllEntries: (state) => adapterSelectors.selectAll(state),
        selectById: (state, id: number) => adapterSelectors.selectById(state, id),
    }
});

export const {selectAllEntries, selectById} = entriesSlice.selectors;

export const selectEntries = createSelector(
    [selectAllEntries],
    (entries) => {
        return entries.filter(e => !e.deleted)
            .sort(entrySorter({field: 'EntryDate', ascending: true}))
    }
)

export const selectDeletedEntries = createSelector(
    [selectAllEntries],
    (entries) => {
        return entries.filter(e => e.deleted)
            .sort(entrySorter({field: 'EntryDate', ascending: true}))
    }
)
export default entriesSlice;
