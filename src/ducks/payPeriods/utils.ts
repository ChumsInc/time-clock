import type {PayPeriod} from "chums-types";
import dayjs from "dayjs";
import type {PHP_PayPeriod} from "@/src/types";

export const payPeriodSorter = (a:PayPeriod, b:PayPeriod) => {
    return dayjs(a.startDate).isAfter(b.startDate) ? 1 : -1;
}

export const payPeriodDateRange = (pp:PayPeriod) => {
    return dayjs(pp.startDate).isSame(pp.endDate, 'year')
        ? `${dayjs(pp.startDate).format('MM/DD')} - ${dayjs(pp.endDate).format('MM/DD/YYYY')}`
        : `${dayjs(pp.startDate).format('MM/DD/YYYY')} - ${dayjs(pp.endDate).format('MM/DD/YYYY')}`
}

export const payPeriodLocaleDateString = (pp:PayPeriod) => {
    return `${dayjs(pp.startDate).toDate().toLocaleDateString()} - ${dayjs(pp.endDate).toDate().toLocaleDateString()}`;
}

export const toPayPeriod = (pp:PHP_PayPeriod):PayPeriod => {
    const {id, completed} = pp;
    return {
        id,
        completed: completed,
        startDate: dayjs(pp.StartDate * 1000).toISOString(),
        endDate: dayjs(pp.EndDate * 1000).toISOString(),
    }
}
