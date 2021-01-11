import React from 'react';
import classNames from "classnames";
import EntryType from "./EntryType";
import {ENTRY_TIMECLOCK} from "../constants";
import Time from "./Time";

const ClockAction = ({date = new Date(), isClockOut = false}) => (
    <div className={classNames("tc__action--date-time", {'tc__action--clock-out': isClockOut})}>
        <div className="tc__action--date">{date.toLocaleDateString()}</div>
        <div className="tc__action--time">{date.toLocaleTimeString()}</div>
    </div>
)


const EntryRow = ({idEntryType, Approved, EmployeeApproved, EntryDate, clockInTime, clockOutTime, Duration, errors, isClockedIn}) => {
    const entryDate = new Date(EntryDate * 1000);
    const iconClassName = {
        'material-icons': true,
        'text-danger': errors.length > 0,
        'text-light': !errors.length && !EmployeeApproved && !Approved,
        'text-info': !errors.length && !!EmployeeApproved && !Approved,
        'text-success': !errors.length && !!EmployeeApproved && !!Approved,
    }
    return (
        <tr className={classNames({'table-danger': errors.length > 0, 'table-info': isClockedIn})}>
            <td><span className={classNames(iconClassName)}>{errors.length ? 'error_outline' : 'thumb_up_alt'}</span></td>
            <td><EntryType idEntryType={idEntryType}/></td>
            <td>{entryDate.toLocaleDateString(undefined, {weekday: 'short'})}</td>
            {!!clockInTime && <td><ClockAction date={new Date(clockInTime * 1000)}/></td>}
            {!clockInTime && idEntryType === ENTRY_TIMECLOCK && (<td>Missing</td>)}
            {!clockInTime && idEntryType !== ENTRY_TIMECLOCK && (<td>{entryDate.toLocaleDateString()}</td>)}
            {!!clockOutTime && <td><ClockAction date={new Date(clockOutTime * 1000)} isClockOut={true}/></td>}
            {!clockOutTime && idEntryType === ENTRY_TIMECLOCK && !isClockedIn && (<td>Missing</td>)}
            {!clockOutTime && idEntryType === ENTRY_TIMECLOCK && isClockedIn && (<td>&mdash;</td>)}
            {!clockOutTime && idEntryType !== ENTRY_TIMECLOCK && (<td>&mdash;</td>)}
            <td className="right"><Time seconds={Duration} /></td>
        </tr>
    )
}

export default EntryRow;
