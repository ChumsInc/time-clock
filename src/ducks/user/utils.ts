import type {
    ClockActionErrorResponse,
    ClockActionRequiresOverrideResponse,
    ClockActionResponse,
    ClockActionSuccessResponse, GetUserInfoResponse, GetUserInfoSuccessResponse
} from "@/ducks/user/response-types";

export function isClockActionSuccess(arg:ClockActionSuccessResponse|ClockActionResponse|null):arg is ClockActionSuccessResponse {
    return !!arg && (arg as ClockActionSuccessResponse).success;
}

export function isClockActionRequiresOverride(arg:ClockActionRequiresOverrideResponse|ClockActionResponse|null):arg is ClockActionRequiresOverrideResponse {
    return !!arg && (arg as ClockActionRequiresOverrideResponse).userOverride;
}

export function isClockActionError(arg:ClockActionErrorResponse|ClockActionResponse|null):arg is ClockActionErrorResponse {
    return !!arg && (arg as ClockActionErrorResponse).error !== undefined;
}

export function isGetUserInfoSuccessResponse(arg:GetUserInfoSuccessResponse|GetUserInfoResponse|null):arg is GetUserInfoSuccessResponse {
    return !!arg && (arg as GetUserInfoSuccessResponse).employee !== undefined;
}
