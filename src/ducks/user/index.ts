import {combineReducers} from "redux";
import {CLOCK_ACTION_URL} from "../../constants";
import {ActionInterface, ActionPayload, fetchJSON, tabSelected} from "chums-ducks";
import {ClockAction, Employee, PayPeriod, PayPeriodEntry} from "../../types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {createReducer} from "@reduxjs/toolkit";
import {clearUser, loadUserInfo, performClockAction, setLoginCode} from "./actions";

export interface UserState {
    actionStatus: ClockAction | 'pending' | 'idle';
    code: string;
    employee: Employee | null;
    entry: PayPeriodEntry | null;
    entryAlert: string | null;
    requiresOverride: boolean;
    overrideText: string | null;
    clockActionFailed: boolean;
    isClockedIn: boolean | null;
    loading: boolean;
}

export const initialUserState: UserState = {
    actionStatus: 'idle',
    code: '',
    employee: null,
    entry: null,
    entryAlert: null,
    requiresOverride: false,
    overrideText: null,
    clockActionFailed: false,
    isClockedIn: false,
    loading: false,
}


export const userSetLoginCode = 'user/setLoginCode';
export const userFetchRequested = 'user/fetchRequested';
export const userFetchSucceeded = 'user/fetchSucceeded';
export const userFetchFailed = 'user/fetchFailed';

export const userClockActionRequested = 'user/clockAction/requested';
export const userClockActionSucceeded = 'user/clockAction/succeeded';
export const userClockActionFailed = 'user/clockAction/failed';

export const userApprovePeriodRequested = 'user/approvePeriod/requested';
export const userApprovePeriodSucceeded = 'user/approvePeriod/succeeded';
export const userApprovePeriodFailed = 'user/approvePeriod/failed';

export const userClearUser = 'user/clearUser';

export const selectUserCode = (state: RootState): string => state.user.code;
export const selectUserLoading = (state: RootState): boolean => state.user.loading;
export const selectEmployee = (state: RootState): Employee | null => state.user.employee;
export const selectUserEntry = (state: RootState): PayPeriodEntry | null => state.user.entry;
export const selectEntryAlert = (state: RootState): string | null => state.user.entryAlert;
export const selectRequiresOverride = (state: RootState): boolean => state.user.requiresOverride;
export const selectOverrideText = (state: RootState): string | null => state.user.overrideText;
export const selectClockActionFailed = (state: RootState): boolean => state.user.clockActionFailed;
export const selectIsClockedIn = (state: RootState): boolean => state.user.isClockedIn;

export const setLoginCodeAction = (code: string): UserAction => ({type: userSetLoginCode, payload: {code}});

export const clearUserAction = () => ({type: userClearUser});

export const approvePayPeriodAction = (): UserThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectUserLoading(state)) {
                return;
            }
            const selected = selectEmployee(state);
            console.log('approvePayPeriodAction()', selected);
            if (!selected || !selected.id || !selected.payPeriod) {
                return;
            }
            dispatch({type: userApprovePeriodRequested});
            const body = {action: 'approve', idEmployee: selected.id, idPayPeriod: selected.payPeriod.id};
            const response = await fetchJSON(CLOCK_ACTION_URL, {
                method: 'POST',
                body: JSON.stringify(body)
            });
            const {employee, isClockedIn, latest_entry, periods} = response;
            dispatch({
                type: userApprovePeriodSucceeded,
                payload: {
                    employee: employee,
                    entry: latest_entry,
                    periods,
                    isClockedIn
                }
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("approvePayPeriodAction()", error.message);
                return dispatch({type: userApprovePeriodFailed, payload: {error, context: userApprovePeriodRequested}})
            }
            console.error("approvePayPeriodAction()", error);
        }
    }

const userReducer = createReducer(initialUserState, (builder) => {
    builder
        .addCase(setLoginCode, (state, action) => {
            state.code = action.payload ?? '';
        })
        .addCase(clearUser, (state) => {
            state.code = '';
            state.employee = null;
            state.entry = null;
            state.entryAlert = null;
            state.requiresOverride = false;
            state.overrideText = null;
            state.clockActionFailed = false;
            state.isClockedIn = false;
            state.loading = false;
        })
        .addCase(loadUserInfo.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadUserInfo.fulfilled, (state, action) => {
            state.employee = action.payload?.employee ?? null;
            state.entry = action.payload?.entry ?? null;
        })
        .addCase(performClockAction.pending, (state, action) => {
            state.actionStatus = action.meta.arg.action;
        })
        .addCase(performClockAction.fulfilled, (state, action) => {
            state.actionStatus = 'idle';
            state.
        })
})
const codeReducer = (state = '', action: UserAction) => {
    const {type, payload} = action;
    switch (type) {
        case userSetLoginCode:
            return payload?.code || '';
        case userClearUser:
            return '';
        default:
            return state;
    }
};

const employeeReducer = (state: Employee | null = null, action: UserAction): Employee | null => {
    const {type, payload} = action;
    switch (type) {
        case userFetchSucceeded:
        case userClockActionSucceeded:
        case userApprovePeriodSucceeded:
            if (payload?.employee) {
                return payload.employee;
            }
            return state;
        case userClearUser:
            return null;
        case tabSelected:
            if (payload?.id && payload.id === 'clock') {
                return null;
            }
            return state;
        default:
            return state;
    }
};

const entryReducer = (state: PayPeriodEntry | null = null, action: UserAction): PayPeriodEntry | null => {
    const {type, payload} = action;
    switch (type) {
        case userClearUser:
            return null;
        case userClockActionSucceeded:
            if (payload?.entry) {
                return {...payload.entry};
            }
            return null;
        case userFetchSucceeded:
            if (payload?.entry) {
                return {...payload.entry};
            }
            return null;
        case tabSelected:
            if (payload?.id && payload.id === 'clock') {
                return null;
            }
            return state;
        default:
            return state;
    }
};

const entryAlertReducer = (state: string | null = null, action: UserAction): string | null => {
    const {type, payload} = action;
    switch (type) {
        case userClockActionSucceeded:
            return payload?.alert || null;
        case userClearUser:
            return null;
        default:
            return state;
    }
};

const requiresOverrideReducer = (state: boolean = false, action: UserAction): boolean => {
    const {type, payload} = action;
    switch (type) {
        case userClockActionSucceeded:
            return payload?.requiresOverride || false;
        case userClearUser:
            return false;
        default:
            return state;
    }
};

const overrideTextReducer = (state: string | null = null, action: UserAction): string | null => {
    const {type, payload} = action;
    switch (type) {
        case userClockActionSucceeded:
            return payload?.overrideText || null;
        case userClearUser:
            return null;
        default:
            return state;
    }
};

const clockActionFailedReducer = (state = false, action: UserAction): boolean => {
    const {type, payload} = action;
    switch (type) {
        case userClockActionSucceeded:
            return payload?.success === false;
        case userClearUser:
            return false;
        default:
            return state;
    }
};

const isClockedInReducer = (state = null, action: UserAction): boolean | null => {
    const {type, payload} = action;
    switch (type) {
        case userClockActionSucceeded:
            return payload?.isClockedIn === true;
        case userClearUser:
            return null;
        default:
            return state;
    }
};

const loadingReducer = (state: boolean = false, action: UserAction): boolean => {
    const {type} = action;
    switch (type) {
        case userClockActionRequested:
        case userFetchRequested:
        case userApprovePeriodRequested:
            return true;
        case userClockActionSucceeded:
        case userFetchSucceeded:
        case userApprovePeriodSucceeded:
        case userClockActionFailed:
        case userFetchFailed:
        case userApprovePeriodFailed:
        case userClearUser:
            return false;
        default:
            return state;
    }
};

export default userReducer;
// export default combineReducers({
//     code: codeReducer,
//     employee: employeeReducer,
//     entry: entryReducer,
//     entryAlert: entryAlertReducer,
//     requiresOverride: requiresOverrideReducer,
//     overrideText: overrideTextReducer,
//     clockActionFailed: clockActionFailedReducer,
//     isClockedIn: isClockedInReducer,
//     loading: loadingReducer,
// })
