import React from 'react';
import {useSelector} from 'react-redux';
import DateRange from "../../components/DateRange";
import EntryRow from "./EntryRow";
import {selectEmployee} from "./index";

interface WeekHeaderProps {
    start: number,
    end: number,
}

const WeekHeader: React.FC<WeekHeaderProps> = ({start, end}) => (
    <tr>
        <th colSpan={6}>
            <DateRange start={start} end={end}/>
        </th>
    </tr>
)

const PayPeriodEntries: React.FC = () => {
    const employee = useSelector(selectEmployee);

    if (!employee || !employee.payPeriod) {
        return null;
    }
    const {entries} = employee;
    const {weeks} = employee.payPeriod;

    const filterWeek = (week: number) => {
        if (weeks[week] === undefined) {
            return [];
        }
        const {start, end} = weeks[week];
        return entries.filter(entry => entry.EntryDate >= start && entry.EntryDate <= end);
    }

    return (
        <div className="table-responsive tc__approval-table">
            <h3>Pay Period Entries</h3>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th />
                    <th>Type</th>
                    <th>Day</th>
                    <th>In</th>
                    <th>Out</th>
                    <th>Hours</th>
                </tr>
                </thead>
                {weeks.map((week, index) => (
                    <tbody key={index}>
                    <WeekHeader start={week.start} end={week.end}/>
                    {filterWeek(index).map(entry => (
                        <EntryRow key={entry.id} entry={entry} />
                    ))}
                    </tbody>
                ))}
            </table>
        </div>
    );
}

export default PayPeriodEntries;
