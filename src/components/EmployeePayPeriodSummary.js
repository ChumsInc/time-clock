import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Time from "./Time";
import classNames from 'classnames';
import {ENTRY_BEREAVJURY, ENTRY_FMLA100, ENTRY_FMLA67, ENTRY_HOLIDAY, ENTRY_PL} from "../constants";
import EntryType from "./EntryType";
import DateRange from "./DateRange";

const filterSpecialEntries = (entry) => [ENTRY_HOLIDAY, ENTRY_PL, ENTRY_BEREAVJURY, ENTRY_FMLA67, ENTRY_FMLA100].includes(entry.idEntryType);

function mapStateToProps({user}) {
    const {PayMethod, entries} = user.employee;
    const {StartDate, EndDate, weeks} = user.employee.payPeriod;

    return {
        StartDate, EndDate, weeks, PayMethod, entries
    };
}

const mapDispatchToProps = {};

class EmployeePayPeriodSummary extends Component {
    static propTypes = {
        StartDate: PropTypes.number,
        EndDate: PropTypes.number,
        weeks: PropTypes.arrayOf(PropTypes.shape({
            start: PropTypes.number,
            end: PropTypes.number,
            duration: PropTypes.number,
            entries: PropTypes.number,
            errors: PropTypes.number,
            overtime: PropTypes.number,
            worked: PropTypes.number,
        })),
        PayMethod: PropTypes.string,
        entries: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            idEntryType: PropTypes.number,
            EntryDate: PropTypes.number,
            Duration: PropTypes.number,
            Note: PropTypes.string,
        }))
    };
    static defaultProps = {
        StarDate: 0,
        EndDate: 0,
        weeks: [],
        PayMethod: 'H',
        entries: [],
    };

    render() {
        const {StartDate, EndDate, weeks, entries} = this.props;
        return (
            <div className="tc__user-info--section">
                <h5>Current Pay Period</h5>
                <table className="table table-hover">
                    <caption>
                        {new Date(StartDate * 1000).toLocaleDateString()}
                        {' '}&mdash;{' '}
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
                    <tfoot>
                    <tr>
                        <th colSpan={2}>Total</th>
                        <td className="right">
                            <Time seconds={weeks[0].duration + weeks[1].duration}/>
                        </td>
                        <td className="right"><Time seconds={weeks[0].overtime + weeks[1].overtime}/></td>
                    </tr>
                    </tfoot>
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeePayPeriodSummary);
