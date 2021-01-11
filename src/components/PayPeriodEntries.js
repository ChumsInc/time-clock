import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import DateRange from "./DateRange";
import EntryRow from "./EntryRow";

const WeekHeader = ({start, end}) => (
    <tr>
       <th colSpan={6}>
           <DateRange start={start} end={end} />
       </th>
    </tr>
)

function mapStateToProps({user}) {
    const {PayMethod, entries} = user.employee;
    const {weeks} = user.employee.payPeriod;

    return {
        weeks, PayMethod, entries
    };
}

const mapDispatchToProps = {};

class PayPeriodEntries extends Component {
    static propTypes = {
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
            errors: PropTypes.arrayOf(PropTypes.string),
        }))
    };
    static defaultProps = {
        weeks: [],
        PayMethod: 'H',
        entries: [],
    };

    filterWeek(week) {
        const {entries, weeks} = this.props;
        if (weeks[week] === undefined) {
            return [];
        }
        const {start, end} = weeks[week];
        return entries.filter(entry => entry.EntryDate >= start && entry.EntryDate <= end);
    }

    render() {
        const {weeks} = this.props;
        return (
            <div className="table-responsive tc__approval-table">
                <h3>Pay Period Entries</h3>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Type</th>
                        <th>Day</th>
                        <th>In</th>
                        <th>Out</th>
                        <th>Hours</th>
                    </tr>
                    </thead>
                    <tbody>
                    {weeks.map((week, index) => (
                        <Fragment key={index}>
                            <WeekHeader start={week.start} end={week.end} />
                            {this.filterWeek(index).map(entry => (
                                <EntryRow key={entry.id} {...entry} />
                            ))}
                        </Fragment>
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
)(PayPeriodEntries);
