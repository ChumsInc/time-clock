import {RootState} from "../../app/configureStore";
import {Employee, PayPeriodEntry} from "../../types";

export const selectUserCode = (state: RootState): string => state.user.code;
export const selectUserLoading = (state: RootState): boolean => state.user.loading;
export const selectEmployee = (state: RootState): Employee|null => state.user.employee;
export const selectUserEntry = (state:RootState):PayPeriodEntry|null => state.user.entry;
export const selectEntryAlert = (state:RootState):string|null => state.user.entryAlert;
export const selectRequiresOverride = (state:RootState): boolean => state.user.requiresOverride;
export const selectOverrideText = (state:RootState):string|null => state.user.overrideText;
export const selectClockActionFailed = (state:RootState):boolean => state.user.clockActionFailed;
export const selectIsClockedIn = (state:RootState) => state.user.isClockedIn;
export const selectUserActionStatus = (state:RootState) => state.user.actionStatus;
