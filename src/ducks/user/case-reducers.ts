import {CaseReducer} from "@reduxjs/toolkit";
import {UserState} from "@/ducks/user/state";

export const _clearUser:CaseReducer<UserState> = (state) => {
    state.code = '';
    state.employee = null;
    state.entry = null;
    state.payPeriod = null;
    state.isClockedIn = null;
    state.entryAlert = null;
    state.requiresOverride = false;
    state.clockInTime = null;
    state.clockOutTime = null;
    state.idPayPeriod = null;
}
