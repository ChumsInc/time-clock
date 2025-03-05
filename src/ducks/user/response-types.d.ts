import {Employee, PayPeriodEntry} from "@/src/types";

export type ClockInActionType = 'clock-in'|'clock-out';
export type ClockActionType = ClockInActionType|'get-userinfo';


export interface ClockAction {
    action: ClockActionType;
    'user-override': 1|0|boolean;
    code: string;
}

export interface ClockActionResponse {
    post:ClockAction;
}
export interface ClockActionSuccessResponse extends ClockActionResponse {
    employee:Employee;
    entry: PayPeriodEntry;
    confirm: string;
    success: boolean;
}

export interface ClockActionRequiresOverrideResponse extends ClockActionResponse {
    employee:Employee;
    entry: PayPeriodEntry;
    alert: string;
    buttonText: string;
    userOverride: boolean;
}

export interface ClockActionErrorResponse extends ClockActionResponse {
    error: string;
}

export interface GetUserInfoResponse {
    code: string;
    post: ClockAction;
    periods: PHP_PayPeriod[];
}

export interface GetUserInfoErrorResponse extends GetUserInfoResponse {
    error: string;
}

export interface GetUserInfoSuccessResponse extends GetUserInfoResponse {
    employee: Employee;
    isClockedIn: boolean;
    latest_entry: PayPeriodEntry;
}
