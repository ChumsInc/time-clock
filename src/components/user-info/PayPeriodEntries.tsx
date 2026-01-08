import {useSelector} from 'react-redux';
import DateRange from "../DateRange";
import EntryRow from "./EntryRow";
import {selectEmployee, selectEmployeePayPeriod} from "@/ducks/user";
import {useAppSelector} from "@/app/configureStore";
import {selectEntries} from "@/ducks/entries";
import type {PayPeriodEntry, PayPeriodWeek} from "@/src/types";
import {Accordion} from "react-bootstrap";

export default function PayPeriodEntries({eventKey}: { eventKey: string }) {
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
    )
}


interface WeekHeaderProps {
    start: number,
    end: number,
}

function WeekHeader({start, end}: WeekHeaderProps) {
    return (
        <tr>
            <th colSpan={6}>
                <DateRange start={start} end={end}/>
            </th>
        </tr>
    )
}

interface WeekTBodyProps {
    week: PayPeriodWeek,
    entries: PayPeriodEntry[]
}
function WeekTBody({week, entries}: WeekTBodyProps) {
    return (
        <tbody>
        <WeekHeader start={week.start} end={week.end}/>
        {entries.filter(e => e.EntryDate >= week.start && e.EntryDate <= week.end)
            .map(entry => (
                <EntryRow key={entry.id} entry={entry}/>
            ))}
        </tbody>
    )
}
