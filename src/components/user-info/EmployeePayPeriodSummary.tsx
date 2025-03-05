import React from 'react';
import {useSelector} from 'react-redux';
import Time from "./Time";
import classNames from 'classnames';
import {ENTRY_BEREAVJURY, ENTRY_FMLA100, ENTRY_FMLA67, ENTRY_HOLIDAY, ENTRY_PL, PayPeriodEntry} from "../../types";
import EntryType from "./EntryType";
import DateRange, {dateRange} from "../DateRange";
import {selectEmployee, selectEmployeePayPeriod} from "@/ducks/user";
import {useAppSelector} from "@/app/configureStore";
import {selectEntries} from "@/ducks/entries";
import {Accordion} from "react-bootstrap";

const filterSpecialEntries = (entry: PayPeriodEntry) => [
    ENTRY_HOLIDAY,
    ENTRY_PL,
    ENTRY_BEREAVJURY,
    ENTRY_FMLA67,
    ENTRY_FMLA100].includes(entry.idEntryType);

const EmployeePayPeriodSummary = ({eventKey}: { eventKey: string }) => {
    const employee = useSelector(selectEmployee);
    const payPeriod = useAppSelector(selectEmployeePayPeriod);
    const entries = useAppSelector(selectEntries);

    if (!employee || !payPeriod) {
        return null;
    }

    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>
                Current Pay Period:
                <strong className="ms-3">{dateRange(payPeriod.StartDate, payPeriod.EndDate)}</strong>
            </Accordion.Header>
            <Accordion.Body>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Week</th>
                        <th>Dates</th>
                        <th className="right">Regular</th>
                        <th className="right">Overtime</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payPeriod.weeks.map((week, index) => (
                        <tr key={week.start} className={classNames({'table-danger': !!week.errors})}>
                            <th>{index + 1}</th>
                            <td><DateRange start={week.start} end={week.end}/></td>
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
                            <Time seconds={payPeriod.weeks[0].duration + payPeriod.weeks[1].duration}/>
                        </td>
                        <td className="right"><Time seconds={payPeriod.weeks[0].overtime + payPeriod.weeks[1].overtime}/></td>
                    </tr>
                    </tfoot>
                </table>
                <table className="table table-hover caption-top">
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
            </Accordion.Body>

        </Accordion.Item>
    );
}

export default EmployeePayPeriodSummary;
