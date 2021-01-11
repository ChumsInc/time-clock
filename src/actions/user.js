import {
    CLEAR_USER,
    CLOCK_ACTION_URL,
    FETCH_CLOCK_ACTION, FETCH_CLOCK_USER,
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_SUCCESS, FETCH_USER_ACTION, SELECT_PAY_PERIOD, SET_COUNTDOWN_TIMER,
    SET_LOGIN_CODE
} from "../constants";
import {fetchPOST} from "./fetch";
import {errorAlert, setAlert} from "./app";

export const setLoginCode = (code) => ({type: SET_LOGIN_CODE, code});

export const clockAction = (action, override = false) => (dispatch, getState) => {
    const {user} = getState();
    const {code} = user;
    const body = {action, 'user-override': override ? 1 : 0, code};
    dispatch({type: FETCH_CLOCK_ACTION, status: FETCH_INIT});
    fetchPOST(CLOCK_ACTION_URL, body)
        .then(res => {
            const {error, employee, entry, alert, userOverride: requiresOverride, buttontext: overrideText, confirm, success} = res;
            if (error) {
                dispatch(setAlert({message: error}));
            }
            dispatch({type: FETCH_CLOCK_ACTION, status: FETCH_SUCCESS,
                employee,
                entry,
                alert: alert || confirm,
                requiresOverride,
                overrideText,
                success
            });
        })
        .catch(err => {
            console.log(err.message);
            dispatch({type: FETCH_CLOCK_ACTION, status: FETCH_FAILURE});
            dispatch(setAlert(errorAlert(err, 'clock-in')));
        })
}

export const setCountdownTimer = (timer) => ({type: SET_COUNTDOWN_TIMER, timer});
export const clearUser = () => ({type: CLEAR_USER});

export const getUserInfo = (idPayPeriod = 0) => (dispatch, getState) => {
    const {user} = getState();
    const {code} = user;
    if (!code) {
        return;
    }
    const body = {action: 'get-userinfo', code, idPayPeriod};
    dispatch({type: FETCH_CLOCK_USER, status: FETCH_INIT});
    fetchPOST(CLOCK_ACTION_URL, body)
        .then(res => {
            const {employee, isClockedIn, latest_entry, periods} = res;
            dispatch({type: FETCH_CLOCK_USER, status: FETCH_SUCCESS, employee, entry: latest_entry, periods, isClockedIn});
        })
        .catch(err => {
            console.log(err.message);
            dispatch({type: FETCH_CLOCK_ACTION, status: FETCH_FAILURE});
            dispatch(setAlert(errorAlert(err, 'user-info')));
        });
}

export const approvePayPeriod = () => (dispatch, getState) => {
    const {user} = getState();
    const {employee} = user;
    if (!!employee.payPeriod && employee.payPeriod.employeeApproved) {
        return;
    }
    const body = {action: 'approve', idEmployee: employee.id, idPayPeriod: employee.payPeriod.id};
    dispatch({type: FETCH_USER_ACTION, status: FETCH_INIT});
    fetchPOST(CLOCK_ACTION_URL, body)
        .then(res => {
            const {employee, isClockedIn, latest_entry, periods} = res;
            dispatch({type: FETCH_USER_ACTION, status: FETCH_SUCCESS, employee, entry: latest_entry, periods, isClockedIn});
        })
        .catch(err => {
            console.log(err.message);
            dispatch({type: FETCH_USER_ACTION, status: FETCH_FAILURE});
            dispatch(setAlert(errorAlert(err, 'user-info')));
        });
}

export const selectPayPeriod = (id) => (dispatch, getState) => {
    const {payPeriod} = getState();
    const [period] = payPeriod.list.filter(pp => pp.id === id);
    dispatch({type: SELECT_PAY_PERIOD, payPeriod: period || {}});
}
