import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import DateRange from "../DateRange";
import EntryRow from "./EntryRow";
import {selectEmployee, selectEmployeePayPeriod} from "@/ducks/user";
import {useAppSelector} from "@/app/configureStore";
import {selectEntries} from "@/ducks/entries";
import type {PayPeriodEntry, PayPeriodWeek} from "@/src/types";
import {Accordion} from "react-bootstrap";

interface WeekHeaderProps {
    start: number,
    end: number,
}

const WeekHeader = ({start, end}: WeekHeaderProps) => (
    <tr>
        <th colSpan={6}>
            <DateRange start={start} end={end}/>
        </th>
    </tr>
)

const WeekTBody = ({week, entries}: { week: PayPeriodWeek, entries: PayPeriodEntry[] }) => {
    const [list, setList] = React.useState<PayPeriodEntry[]>([]);


    useEffect(() => {
        const list = entries.filter(e => e.EntryDate >= week.start && e.EntryDate <= week.end);
        setList(list);
    }, [entries, week])

    return (
        <tbody>
        <WeekHeader start={week.start} end={week.end}/>
        {list.map(entry => (
            <EntryRow key={entry.id} entry={entry}/>
        ))}
        </tbody>
    )
}

const PayPeriodEntries = ({eventKey}:{eventKey:string}) => {
    const employee = useSelector(selectEmployee);
    const payPeriod = useSelector(selectEmployeePayPeriod);
    const entries = useAppSelector(selectEntries)

    if (!employee || !payPeriod) {
        return null;
    }

    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>Pay Period Entries</Accordion.Header>
            <Accordion.Body>
                <div className="table-responsive">
                    <table className="table table-hover" tabIndex={0}>
                        <thead>
                        <tr>
                            <th><span className="visually-hidden">Status</span></th>
                            <th>Type</th>
                            <th>Day</th>
                            <th>In</th>
                            <th>Out</th>
                            <th>Hours</th>
                        </tr>
                        </thead>
                        {payPeriod.weeks.map((week) => (
                            <WeekTBody key={week.start} week={week} entries={entries}/>
                        ))}
                    </table>
                </div>
            </Accordion.Body>
        </Accordion.Item>

    );
}

export default PayPeriodEntries;
