import classNames from "classnames";
import EntryType from "./EntryType";
import {ENTRY_TIMECLOCK, type PayPeriodEntry} from "../../types";
import TimeDisplay from "./TimeDisplay.tsx";
import styled from "@emotion/styled";

const timeFormat: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', hour12: true};

const ClockActionRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;

    &.tc__action--clock-out{
        flex-direction: row-reverse;
    }
    @media screen and (max-width:1199px) {
        flex-direction: column !important;
    }
`;

const ClockActionDate = styled.div`
    font-size: small;
`
const ClockActionTime = styled.div`
    font-weight: bold;
    white-space: nowrap;
`

interface ClockActionProps {
    date: Date,
    isClockOut?: boolean,
}

const ClockAction = ({date = new Date(), isClockOut}:ClockActionProps) => (
    <ClockActionRow className={classNames({'tc__action--clock-out': isClockOut})}>
        <ClockActionDate>{date.toLocaleDateString()}</ClockActionDate>
        <ClockActionTime>{date.toLocaleTimeString(undefined, timeFormat)}</ClockActionTime>
    </ClockActionRow>
)


export interface EntryRowProps {
    entry: PayPeriodEntry,
}

export default function EntryRow({entry}:EntryRowProps) {
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
            <td className="right"><TimeDisplay seconds={Duration}/></td>
        </tr>
    )
}
