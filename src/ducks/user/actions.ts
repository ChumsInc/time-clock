import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    ApprovePayPeriodArg,
    fetchUserInfo,
    postApprovePayPeriod,
    postClockEvent,
    PostClockInArg,
    UserInfoArg
} from "@/ducks/user/api";
import {
    ClockActionErrorResponse,
    ClockActionSuccessResponse, GetUserInfoErrorResponse,
    GetUserInfoSuccessResponse
} from "@/ducks/user/response-types";
import {RootState} from "@/app/configureStore";
import {selectStatus} from "@/ducks/user/index";

export const clockAction = createAsyncThunk<ClockActionSuccessResponse|ClockActionErrorResponse|null, PostClockInArg, {state: RootState}>(
    'user/clockIn',
    async (arg) => {
        return await postClockEvent(arg)
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.code && selectStatus(state) === 'idle';
        }
    }
)

export const getUserInfo = createAsyncThunk<GetUserInfoSuccessResponse | GetUserInfoErrorResponse | null, UserInfoArg, {state:RootState}>(
    'user/getUserInfo',
    async (arg) => {
        return await fetchUserInfo(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.code && selectStatus(state) === 'idle';
        }
    }
)

export const approvePayPeriod = createAsyncThunk<GetUserInfoSuccessResponse | GetUserInfoErrorResponse | null, ApprovePayPeriodArg, {state:RootState}>(
    'user/approvePayPeriod',
    async (arg) => {
        return await postApprovePayPeriod(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.code && selectStatus(state) === 'idle';
        }
    }
)
