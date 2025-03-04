import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {ClockActionPost, ClockActionResponse, UserInfoResponse} from "../../types";
import {RootState} from "../../app/configureStore";
import {execClockAction, fetchUserInfo} from "../../api/user";
import {selectUserActionStatus, selectUserCode} from "./selectors";

export const setLoginCode = createAction<string>('user/setLoginCode');

export const clearUser = createAction('user/clearUser');

export const loadUserInfo = createAsyncThunk<UserInfoResponse|null, number>(
    'user/loadInfo',
    async (arg, {getState}) => {
        const state = getState() as RootState;
        const code = selectUserCode(state);
        return await fetchUserInfo({idPayPeriod: arg, code});
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !!arg && !!selectUserCode(state);
        }
    }
)

export const performClockAction = createAsyncThunk<ClockActionResponse|null, ClockActionPost>(
    'user/performClockAction',
    async (arg) => {
        return await execClockAction(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return selectUserActionStatus(state) === 'idle';
        }
    }
)


// export const performClockAction = (action: string, override: boolean = false): UserThunkAction =>
//     async (dispatch, getState) => {
//         try {
//             const state = getState();
//             if (selectUserLoading(state)) {
//                 return;
//             }
//             const code = selectUserCode(state);
//             const body = {action, 'user-override': override ? 1 : 0, code};
//             const res = await fetchJSON(CLOCK_ACTION_URL, {
//                 method: 'POST',
//                 body: JSON.stringify(body)
//             });
//             const {
//                 error,
//                 employee,
//                 entry,
//                 alert,
//                 userOverride: requiresOverride,
//                 buttontext: overrideText,
//                 confirm,
//                 success
//             } = res;
//             if (error) {
//                 dispatch({
//                     type: userClockActionFailed,
//                     payload: {error: new Error(error), context: userClockActionRequested}
//                 });
//             }
//             dispatch({
//                 type: userClockActionSucceeded,
//                 payload: {
//                     employee,
//                     entry,
//                     alert: alert || confirm,
//                     requiresOverride,
//                     overrideText,
//                     success
//                 }
//             });
//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 console.log("performClockAction()", error.message);
//                 return dispatch({type: userClockActionFailed, payload: {error, context: userClockActionRequested}})
//             }
//             console.error("performClockAction()", error);
//         }
//     }
