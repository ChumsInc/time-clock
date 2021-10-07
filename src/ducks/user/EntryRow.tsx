import React from 'react';
import classNames from "classnames";
import EntryType from "./EntryType";
import {ENTRY_TIMECLOCK, PayPeriodEntry} from "../../types";
import Time from "./Time";

const timeFormat: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', hour12: true};

interface ClockActionProps {
    date: Date,
    isClockOut?: boolean,
}

const ClockAction: React.FC<ClockActionProps> = ({date = new Date(), isClockOut}) => (
    <div className={classNames("tc__action--date-time", {'tc__action--clock-out': isClockOut})}>
        <div className="tc__action--date">{date.toLocaleDateString()}</div>
        <div className="tc__action--time">{date.toLocaleTimeString(undefined, timeFormat)}</div>
    </div>
)


export interface EntryRowProps {
    entry: PayPeriodEntry,
}

const EntryRow: React.FC<EntryRowProps> = ({entry}) => {
    const {
        idEntryType,
        Approved,
        EmployeeApproved,
        EntryDate,
        clockInTime,
        clockOutTime,
        Duration,
        errors,
        isClockedIn
    } = entry
    const entryDate = new Date(EntryDate * 1000);
    const iconClassName = {
        'bi-hand-thumbs-up-fill': !errors.length && (EmployeeApproved || Approved),
        'bi-exclamation-circle-fill': !!errors.length,
        'text-danger': errors.length > 0,
        'text-light': !errors.length && !EmployeeApproved && !Approved,
        'text-info': !errors.length && EmployeeApproved && !Approved,
        'text-success': !errors.length && EmployeeApproved && Approved,
    }
    return (
        <tr className={classNames({'table-danger': errors.length > 0, 'table-info': isClockedIn})}>
            <td><span className={classNames(iconClassName)}/></td>
            <td><EntryType idEntryType={idEntryType}/></td>
            <td>{entryDate.toLocaleDateString(undefined, {weekday: 'short'})}</td>
            <td>
                {!!clockInTime && (<ClockAction date={new Date(clockInTime * 1000)}/>)}
                {!clockInTime && idEntryType === ENTRY_TIMECLOCK && (<span>Missing</span>)}
                {!clockInTime && idEntryType !== ENTRY_TIMECLOCK && (<span>{entryDate.toLocaleDateString()}</span>)}
            </td>
            <td>
                {!!clockOutTime && (<ClockAction date={new Date(clockOutTime * 1000)} isClockOut={true}/>)}
                {!clockOutTime && idEntryType === ENTRY_TIMECLOCK && !isClockedIn && (<span>Missing</span>)}
                {!clockOutTime && idEntryType === ENTRY_TIMECLOCK && isClockedIn && (<span>&mdash;</span>)}
                {!clockOutTime && idEntryType !== ENTRY_TIMECLOCK && (<span>&mdash;</span>)}
            </td>
            <td className="right"><Time seconds={Duration}/></td>
        </tr>
    )
}

export default EntryRow;
