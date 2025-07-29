import type {Employee, PayPeriodEntry, PHP_PayPeriod} from "@/src/types";

export interface UserState {
    code: string;
    status: 'idle'|'pending'|'rejected';
    employee: Omit<Employee, 'entries'|'deleted_entries'|'payPeriod'>|null;
    entry: PayPeriodEntry|null;
    payPeriod: PHP_PayPeriod|null;
    isClockedIn: boolean|null;
    entryAlert: string|null;
    overrideText: string|null;
    requiresOverride: boolean;
    clockInTime: number|null;
    clockOutTime: number|null;
    idPayPeriod: number|null;
}
