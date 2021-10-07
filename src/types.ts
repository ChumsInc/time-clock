export interface BannerImage {
    id: number,
    filename: string,
    overlay: string|null,
    active: boolean,
    timestamp: string,
}

export interface PayPeriodWeek {
    start: number,
    end: number,
    duration: number,
    errors: number,
    worked: number,
    overtime: number,
}
export interface PayPeriod {
    id: number,
    StartDate: number,
    Week2Start: number,
    EndDate: number,
    completed: boolean,
    weeks: PayPeriodWeek[],
    employeeApproved: boolean,
    employeeApprovalTime: string,
    approved: boolean,
    approvedByName: string,
    approvalTime: string,
}

export interface TimeAction {
    id: number,
    idEntry: number,
    type: number,
    time: number,
    ip: string,
    idUser: number,
    userName: string,
    notes: string,
    timestamp: string,
}
export interface PayPeriodEntry {
    id: number,
    idEmployee: number,
    idEntryType: number,
    idUser: number,
    EntryDate: number,
    Duration: number,
    Note: string,
    errors: string[],
    Approved: boolean,
    ApprovedBy: number,
    ApprovalTime: string,
    EmployeeApproved: boolean,
    EmployeeApprovalTime: string,
    deleted: boolean,
    deletedBy: number,
    Processed: boolean,
    Actions: TimeAction[],
    clockInTime: number,
    clockOutTime: number,
    isClockedIn: boolean,
    timestamp: string,
}

export interface Employee {
    id: number,
    LoginCode: string,
    Department: string,
    EmployeeNumber: string,
    FirstName: string,
    LastName: string,
    AddressLine1: string,
    AddressLine2: string,
    City: string,
    State: string,
    ZipCode: string,
    TelephoneNumber: string,
    HireDate: string,
    TerminationDate: string,
    EmergencyPhoneNumber: string,
    EmergencyContact: string,
    PayMethod: 'S'|'H',
    AutopayHours: number,
    EmployeeStatus: 'A'|'I'|'T',
    HoursAccrued: number,
    HoursUsed: number,
    AnnualHourLimit: number,
    CarryOverHours: number,
    HoursAvailable: number,
    errorInfo: string|null,
    hsaEmployeeKey: string|null,
    entries: PayPeriodEntry[],
    deletedEntries: PayPeriodEntry[],
    payPeriod: PayPeriod
}


export interface TCTime {
    hours: number,
    minutes: number,
    seconds: number,
}


export const ENTRY_TIMECLOCK = 1;
export const ENTRY_MANUAL = 2;
export const ENTRY_HOLIDAY = 3;
export const ENTRY_PL = 4;
export const ENTRY_BEREAVJURY = 5;
export const ENTRY_OVERTIME = 6;
export const ENTRY_AUTOMATIC = 7;
export const ENTRY_COMPANY_TIME = 8;
export const ENTRY_SWAP_TIME = 9;
export const ENTRY_SUH = 10;
export const ENTRY_FMLA100 = 11;
export const ENTRY_FMLA67 = 12;

export interface EntryTypeDescriptions {
    [key: number]: string,
}
export const ENTRY_TYPE_DESCRIPTIONS:EntryTypeDescriptions = {
    [ENTRY_TIMECLOCK]: 'Time Clock',
    [ENTRY_MANUAL]: 'Manual Entry',
    [ENTRY_HOLIDAY]: 'Holiday',
    [ENTRY_PL]: 'Personal Leave',
    [ENTRY_BEREAVJURY]: 'Bereavement/Jury Duty',
    [ENTRY_AUTOMATIC]: 'Salary (Automated)',
    [ENTRY_COMPANY_TIME]: 'Company Time',
    [ENTRY_SWAP_TIME]: 'Swap Time',
    [ENTRY_SUH]: 'Southern Utah Holdings',
    [ENTRY_FMLA67]: 'FMLA Leave',
    [ENTRY_FMLA100]: 'FMLA Leave',
}
