import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PayPeriod} from "chums-types";
import dayjs from "dayjs";
import {payPeriodSorter, toPayPeriod} from "@/ducks/payPeriods/utils";
import {getUserInfo} from "@/ducks/user/actions";
import {clearUser} from "@/ducks/user";
import {isGetUserInfoSuccessResponse} from "@/ducks/user/utils";

const payPeriodsAdapter = createEntityAdapter<PayPeriod, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
});

const adapterSelectors = payPeriodsAdapter.getSelectors();

interface PayPeriodsExtraState {
    current: PayPeriod | null;
    status: 'idle' | 'loading';
    hireDate: string | null;
    now: string,
}

const extraState: PayPeriodsExtraState = {
    current: null,
    status: 'idle',
    hireDate: null,
    now: JSON.stringify(new Date()),
}

const payPeriodsSlice = createSlice({
    name: 'pay-periods',
    initialState: payPeriodsAdapter.getInitialState(extraState),
    reducers: {
        setCurrentPayPeriod: (state, action: PayloadAction<PayPeriod | null>) => {
            state.current = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearUser, (state) => {
                payPeriodsAdapter.removeAll(state);
                state.hireDate = null;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                if (action.payload) {
                    const payPeriods = action.payload.periods.map(pp => toPayPeriod(pp));
                    payPeriodsAdapter.setAll(state, payPeriods);

                }
                if (isGetUserInfoSuccessResponse(action.payload)) {
                    state.hireDate = action.payload.employee.HireDate;
                    state.current = toPayPeriod(action.payload.employee.payPeriod);
                }
            })
        //@todo: handle load pay periods
        //@todo: handle load employee (set start date, set currentPayPeriod)
    },
    selectors: {
        selectCurrentPayPeriod: (state) => {
            state.current;
        },
        selectClosedPayPeriods: (state) => {
            const hireDate = dayjs(state.hireDate);
            if (!hireDate.isValid()) {
                return [];
            }
            return adapterSelectors.selectAll(state)
                .filter(pp => pp.completed)
                .filter(pp => dayjs(pp.endDate).isAfter(hireDate))
                .sort(payPeriodSorter)
                .reverse();
        },
        selectOpenPayPeriods: (state) => {
            const hireDate = dayjs(state.hireDate);
            if (!hireDate.isValid()) {
                return [];
            }
            return adapterSelectors.selectAll(state)
                .filter(pp => !pp.completed)
                .filter(pp => dayjs(pp.endDate).isAfter(hireDate))
                .sort(payPeriodSorter);
        },
    },
});

export const {selectCurrentPayPeriod, selectClosedPayPeriods, selectOpenPayPeriods} = payPeriodsSlice.selectors;
export const {setCurrentPayPeriod} = payPeriodsSlice.actions;

export default payPeriodsSlice;
