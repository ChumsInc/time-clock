import {combineReducers} from "redux";
import {CLOCK_ACTION_URL} from "../../constants";
import {ActionInterface, ActionPayload, fetchJSON, tabSelected} from "chums-ducks";
import {Employee, PayPeriod, PayPeriodEntry} from "../../types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";

export interface UserPayload extends ActionPayload {
    code?: string,
    employee?: Employee,
    entry?: PayPeriodEntry,
    alert?: string,
    requiresOverride?: boolean,
    overrideText?: string,
    success?: boolean,
    periods?: PayPeriod[],
    id?: string,
    isClockedIn?: boolean,
}

export interface UserAction extends ActionInterface {
    payload?: UserPayload,
}

export interface UserThunkAction extends ThunkAction<any, RootState, unknown, UserAction> {
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
export const selectEmployee = (state: RootState): Employee|null => state.user.employee;
export const selectUserEntry = (state:RootState):PayPeriodEntry|null => state.user.entry;
export const selectEntryAlert = (state:RootState):string|null => state.user.entryAlert;
export const selectRequiresOverride = (state:RootState): boolean => state.user.requiresOverride;
export const selectOverrideText = (state:RootState):string|null => state.user.overrideText;
export const selectClockActionFailed = (state:RootState):boolean => state.user.clockActionFailed;
export const selectIsClockedIn = (state:RootState):boolean => state.user.isClockedIn;

export const setLoginCodeAction = (code: string): UserAction => ({type: userSetLoginCode, payload: {code}});

export const performClockAction = (action: string, override: boolean = false): UserThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectUserLoading(state)) {
                return;
            }
            const code = selectUserCode(state);
            const body = {action, 'user-override': override ? 1 : 0, code};
            const res = await fetchJSON(CLOCK_ACTION_URL, {
                method: 'POST',
                body: JSON.stringify(body)
            });
            const {
                error,
                employee,
                entry,
                alert,
                userOverride: requiresOverride,
                buttontext: overrideText,
                confirm,
                success
            } = res;
            if (error) {
                dispatch({
                    type: userClockActionFailed,
                    payload: {error: new Error(error), context: userClockActionRequested}
                });
            }
            dispatch({
                type: userClockActionSucceeded,
                payload: {
                    employee,
                    entry,
                    alert: alert || confirm,
                    requiresOverride,
                    overrideText,
                    success
                }
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("performClockAction()", error.message);
                return dispatch({type: userClockActionFailed, payload: {error, context: userClockActionRequested}})
            }
            console.error("performClockAction()", error);
        }
    }

export const clearUserAction = () => ({type: userClearUser});

export const getUserInfoAction = (idPayPeriod = 0): UserThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            if (selectUserLoading(state)) {
                return;
            }
            dispatch({type: userFetchRequested});
            const code = selectUserCode(state);
            const body = {action: 'get-userinfo', code, idPayPeriod};
            const response = await fetchJSON(CLOCK_ACTION_URL, {
                method: 'POST',
                body: JSON.stringify(body),
            });
            const {employee, isClockedIn, latest_entry, periods} = response;
            dispatch({type: userFetchSucceeded, payload: {employee, isClockedIn, entry: latest_entry, periods}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("getUserInfoAction()", error.message);
                return dispatch({type: userFetchFailed, payload: {error, context: userFetchRequested}})
            }
            console.error("getUserInfoAction()", error);
        }
    }

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


export default combineReducers({
    code: codeReducer,
    employee: employeeReducer,
    entry: entryReducer,
    entryAlert: entryAlertReducer,
    requiresOverride: requiresOverrideReducer,
    overrideText: overrideTextReducer,
    clockActionFailed: clockActionFailedReducer,
    isClockedIn: isClockedInReducer,
    loading: loadingReducer,
})
