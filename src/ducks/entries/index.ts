import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {PayPeriodEntry} from "@/src/types";
import {clearUser} from "@/ducks/user";
import {approvePayPeriod, clockAction, getUserInfo} from "@/ducks/user/actions";
import {isClockActionSuccess, isGetUserInfoSuccessResponse} from "@/ducks/user/utils";

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
        selectEntries: (state) => adapterSelectors.selectAll(state).filter(e => !e.deleted),
        selectDeletedEntries: (state) => adapterSelectors.selectAll(state).filter(e => e.deleted),
        selectById: (state, id: number) => adapterSelectors.selectById(state, id),
    }
});

export const {selectEntries, selectDeletedEntries, selectById} = entriesSlice.selectors;
export default entriesSlice;
