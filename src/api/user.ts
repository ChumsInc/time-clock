import {ClockActionPost, ClockActionResponse, UserInfoResponse} from "../types";
import {fetchJSON} from "chums-components";
import {CLOCK_ACTION_URL} from "../constants";

export interface LoadUserInfoProps {
    idPayPeriod: number,
    code: string;
}
export async function fetchUserInfo(arg:LoadUserInfoProps):Promise<UserInfoResponse|null> {
    try {
        const body = {
            ...arg,
            action: 'get-userinfo',
        }
        const res = await fetchJSON<UserInfoResponse>(CLOCK_ACTION_URL, {
            method: 'POST',
            body: JSON.stringify(body)
        });
        return res ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("loadUserInfo()", err.message);
            return Promise.reject(err);
        }
        console.debug("loadUserInfo()", err);
        return Promise.reject(new Error('Error in loadUserInfo()'));
    }
}

export async function execClockAction(arg:ClockActionPost):Promise<ClockActionResponse|null> {
    try {
        const res = await fetchJSON<ClockActionResponse>(CLOCK_ACTION_URL, {
            method: 'POST',
            body: JSON.stringify(arg)
        });
        return res ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("execClockAction()", err.message);
            return Promise.reject(err);
        }
        console.debug("execClockAction()", err);
        return Promise.reject(new Error('Error in execClockAction()'));
    }
}
