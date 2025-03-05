import {
    ClockActionErrorResponse,
    ClockActionSuccessResponse,
    ClockInActionType,
    GetUserInfoErrorResponse,
    GetUserInfoSuccessResponse
} from "@/ducks/user/response-types";
import {fetchJSON} from "@chumsinc/ui-utils";
import {CLOCK_ACTION_URL} from "@/app/constants";

export interface PostClockInArg {
    action: ClockInActionType;
    code: string;
    override?: boolean;
}

export async function postClockEvent(arg: PostClockInArg): Promise<ClockActionSuccessResponse | ClockActionErrorResponse | null> {
    try {
        const body = JSON.stringify({
            action: arg.action,
            code: arg.code,
            ['user-override']: arg.override ? 1 : 0,
        });
        const res = await fetchJSON<ClockActionSuccessResponse | ClockActionErrorResponse>(CLOCK_ACTION_URL, {
            method: "POST",
            body
        });
        return res ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postClockEvent()", err.message);
            return Promise.reject(err);
        }
        console.debug("postClockEvent()", err);
        return Promise.reject(new Error('Error in postClockEvent()'));
    }

}

export interface UserInfoArg {
    code: string;
    idPayPeriod?: number | null;
}

export async function fetchUserInfo(arg: UserInfoArg): Promise<GetUserInfoSuccessResponse | GetUserInfoErrorResponse | null> {
    try {
        const body = JSON.stringify({
            action: 'get-userinfo',
            code: arg.code,
            idPayPeriod: arg.idPayPeriod ?? 0,
        });
        const res = await fetchJSON<GetUserInfoSuccessResponse | GetUserInfoErrorResponse>(CLOCK_ACTION_URL, {
            method: "POST",
            body
        });
        return res ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchUserInfo()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchUserInfo()", err);
        return Promise.reject(new Error('Error in fetchUserInfo()'));
    }
}

export interface ApprovePayPeriodArg {
    code: string;
    idEmployee: number;
    idPayPeriod: number;
}

export async function postApprovePayPeriod(arg: ApprovePayPeriodArg): Promise<GetUserInfoSuccessResponse | GetUserInfoErrorResponse | null> {
    try {
        const body = JSON.stringify({
            action: 'approve',
            code: arg.code,
            idEmployee: arg.idEmployee,
            idPayPeriod: arg.idPayPeriod,
        });
        const res = await fetchJSON<GetUserInfoSuccessResponse | GetUserInfoErrorResponse>(CLOCK_ACTION_URL, {
            method: "POST",
            body
        });
        return res ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postApprovePayPeriod()", err.message);
            return Promise.reject(err);
        }
        console.debug("postApprovePayPeriod()", err);
        return Promise.reject(new Error('Error in postApprovePayPeriod()'));
    }
}
