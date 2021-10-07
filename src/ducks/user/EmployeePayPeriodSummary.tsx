import React from 'react';
import {useSelector} from 'react-redux';
import Time from "./Time";
import classNames from 'classnames';
import {ENTRY_BEREAVJURY, ENTRY_FMLA100, ENTRY_FMLA67, ENTRY_HOLIDAY, ENTRY_PL} from "../../types";
import EntryType from "./EntryType";
import DateRange from "../../components/DateRange";
import {selectEmployee} from "./index";
import {PayPeriodEntry} from "../../types";

const filterSpecialEntries = (entry:PayPeriodEntry) => [
    ENTRY_HOLIDAY,
    ENTRY_PL,
    ENTRY_BEREAVJURY,
    ENTRY_FMLA67,
    ENTRY_FMLA100].includes(entry.idEntryType);

const EmployeePayPeriodSummary:React.FC = () => {
    const employee = useSelector(selectEmployee);
    if (!employee) {
        return null;
    }
    const {entries} = employee;
    const {StartDate, EndDate, weeks} = employee.payPeriod;

    return (
        <div className="tc__user-info--section">
            <h5>Current Pay Period</h5>
            <table className="table table-hover">
                <caption>
                    {new Date(StartDate * 1000).toLocaleDateString()}
                    <span className="tc--date-separator">&mdash;</span>
                    {new Date(EndDate * 1000).toLocaleDateString()}
                </caption>
                <thead>
                <tr>
                    <th>Week</th>
                    <th>Dates</th>
                    <th className="right">Regular</th>
                    <th className="right">Overtime</th>
                </tr>
                </thead>
                <tbody>
                {weeks.map((week, index) => (
                    <tr key={week.start} className={classNames({'table-danger': !!week.errors})}>
                        <th>{index + 1}</th>
                        <td><DateRange start={week.start} end={week.end} /></td>
                        <td className="right">
                            <Time seconds={week.duration}/>
                        </td>
                        <td className="right"><Time seconds={week.overtime}/></td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th colSpan={2}>Total</th>
                    <td className="right">
                        <Time seconds={weeks[0].duration + weeks[1].duration}/>
                    </td>
                    <td className="right"><Time seconds={weeks[0].overtime + weeks[1].overtime}/></td>
                </tr>
                </tfoot>
            </table>
            <table className="table table-hover">
                <caption>Special Entries</caption>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th className="right">Hours</th>
                </tr>
                </thead>
                <tbody>
                {entries.filter(filterSpecialEntries)
                    .map(entry => (
                        <tr key={entry.id}>
                            <td>{new Date(entry.EntryDate * 1000).toLocaleDateString()}</td>
                            <td><EntryType idEntryType={entry.idEntryType}/></td>
                            <td className="right"><Time seconds={entry.Duration}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeePayPeriodSummary;
