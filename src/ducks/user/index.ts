import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {approvePayPeriod, clockAction, getUserInfo} from "@/ducks/user/actions";
import {isClockActionRequiresOverride, isClockActionSuccess, isGetUserInfoSuccessResponse} from "@/ducks/user/utils";
import {_clearUser} from "@/ducks/user/case-reducers";
import {UserState} from "@/ducks/user/state";
import {dismissAlert} from "@chumsinc/alert-list";

const initialState: UserState = {
    code: '',
    status: 'idle',
    employee: null,
    entry: null,
    payPeriod: null,
    isClockedIn: null,
    entryAlert: null,
    overrideText: null,
    requiresOverride: false,
    clockInTime: null,
    clockOutTime: null,
    idPayPeriod: null,
}


const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setCode: (state, action:PayloadAction<string>) => {
            state.code = action.payload;
        },
        clearUser: _clearUser
    },
    extraReducers: (builder) => {
        builder
            .addCase(clockAction.pending, (state, action) => {
                state.code = action.meta.arg.code;
                state.status = 'idle';
            })
            .addCase(clockAction.fulfilled, (state, action) => {
                if (isClockActionSuccess(action.payload)) {
                    const {entries, deleted_entries, payPeriod, ...employee} = action.payload.employee;
                    state.employee = employee;
                    state.isClockedIn = action.payload.entry.isClockedIn ?? false;
                    state.entry = action.payload.entry;
                    state.entryAlert = action.payload.confirm;
                    return;
                }
                if (isClockActionRequiresOverride(action.payload)) {
                    const {entries, deleted_entries, payPeriod, ...employee} = action.payload.employee;
                    state.employee = employee;
                    state.requiresOverride = true;
                    state.overrideText = action.payload.buttonText;
                    state.entryAlert = action.payload.alert;
                    return;
                }
                _clearUser(state, action);
            })
            .addCase(clockAction.rejected, (state, action) => {
                state.status = 'rejected';
                _clearUser(state, action);
            })
            .addCase(getUserInfo.pending, (state, action) => {
                state.status = 'pending';
                state.code = action.meta.arg.code;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.status = 'idle';
                if (isGetUserInfoSuccessResponse(action.payload)) {
                    const {entries, deleted_entries, payPeriod, ...employee} = action.payload.employee;
                    state.payPeriod = payPeriod;
                    state.employee = employee;
                    state.isClockedIn = action.payload.isClockedIn;
                    state.entry = action.payload.latest_entry;
                    return;
                }
                _clearUser(state, action);
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.status = 'rejected';
                _clearUser(state, action);
            })
            .addCase(approvePayPeriod.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(approvePayPeriod.fulfilled, (state, action) => {
                state.status = 'idle';
                if (isGetUserInfoSuccessResponse(action.payload)) {
                    const {entries, deleted_entries, payPeriod, ...employee} = action.payload.employee;
                    state.payPeriod = payPeriod;
                    state.employee = employee;
                    return;
                }
                _clearUser(state, action);
            })
            .addCase(dismissAlert, (state, action) => {
                if ([clockAction.typePrefix, getUserInfo.typePrefix, approvePayPeriod.typePrefix].includes(action.payload?.context)) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectUserCode: (state) => state.code,
        selectUserLoading: (state) => state.status === 'pending',
        selectStatus: (state) => state.status,
        selectEmployee: (state) => state.employee,
        selectEmployeePayPeriod: (state) => state.payPeriod,
        selectUserEntry: (state) => state.entry,
        selectEntryAlert: (state) => state.entryAlert,
        selectOverrideText: (state) => state.overrideText,
        selectRequiresOverride: (state) => state.requiresOverride,
    }
});

export const {clearUser, setCode} = userSlice.actions;
export const {
    selectEmployee,
    selectStatus,
    selectOverrideText,
    selectUserEntry,
    selectUserCode,
    selectEntryAlert,
    selectUserLoading,
    selectRequiresOverride,
    selectEmployeePayPeriod
} = userSlice.selectors;

export default userSlice;
