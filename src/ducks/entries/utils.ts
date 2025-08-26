import type {SortProps} from "chums-types";
import type {PayPeriodEntry} from "@/src/types.ts";
import dayjs from "dayjs";

export const entrySorter = (sort:SortProps<PayPeriodEntry>) => (a:PayPeriodEntry, b:PayPeriodEntry) => {
    const {field, ascending} = sort;
    const sortMod = ascending ? 1 : -1;
    switch (field) {
        case 'EntryDate':
            return (
                dayjs(a.EntryDate * 1000).valueOf() - dayjs(b.EntryDate * 1000).valueOf()
            ) * sortMod;
        case 'id':
        default:
            return (
                a.id - b.id
            ) * sortMod
    }
}
