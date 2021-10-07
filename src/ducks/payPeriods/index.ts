import {PayPeriod} from "../../types";
import {selectEmployee, UserAction, userFetchSucceeded} from "../user";
import {RootState} from "../index";

export const selectClosedPayPeriods = (state: RootState) => {
    const employee = selectEmployee(state);
    if (!employee) {
        return [];
    }

    const hireDate = new Date(employee.HireDate).valueOf() / 1000;
    return state.payPeriods
        .filter(pp => pp.completed)
        .filter(pp => pp.StartDate >= hireDate)
        .sort((a, b) => b.StartDate - a.StartDate)
}

export const selectOpenPayPeriods = (state: RootState) => {
    const employee = selectEmployee(state);
    if (!employee) {
        return [];
    }

    const hireDate = new Date(employee.HireDate).valueOf() / 1000;
    return state.payPeriods
        .filter(pp => !pp.completed)
        .filter(pp => pp.StartDate >= hireDate)
        .sort((a, b) => b.StartDate - a.StartDate)
}


const payPeriodsReducer = (state: PayPeriod[] = [], action: UserAction): PayPeriod[] => {
    const {type, payload} = action;
    switch (type) {
    case userFetchSucceeded:
        if (payload?.periods) {
            return [...payload.periods];
        }
        return state;
    default:
        return state;
    }
}

export default payPeriodsReducer;
