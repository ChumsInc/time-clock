import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Time from "./Time";
import {ENTRY_PL} from "../constants";
import classNames from 'classnames';
import Alert from "./Alert";
import PayPeriodSelect from "./PayPeriodSelect";
import {approvePayPeriod, getUserInfo} from '../actions/user';
import FormGroupText from "./FormGroupText";
import DateRange from "./DateRange";
import parse from 'date-fns/parse';

const parseFormat = 'y-MM-dd HH:mm:ss';

function mapStateToProps({user}) {
    const {entries} = user.employee;
    const {weeks, id, approved, approvedByName, approvalTime, employeeApproved, employeeApprovalTime} = user.employee.payPeriod;

    return {
        idPayPeriod: id,
        weeks,
        entries,
        approved,
        approvedByName,
        approvalTime,
        employeeApproved,
        employeeApprovalTime,
    };
}

const mapDispatchToProps = {
    getUserInfo,
    approvePayPeriod,
};

class PayPeriodApproveSummary extends Component {
    static propTypes = {
        idPayPeriod: PropTypes.number,
        weeks: PropTypes.arrayOf(PropTypes.shape({
            start: PropTypes.number,
            end: PropTypes.number,
            duration: PropTypes.number,
            entries: PropTypes.number,
            errors: PropTypes.number,
            overtime: PropTypes.number,
            worked: PropTypes.number,
        })),
        entries: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            idEntryType: PropTypes.number,
            EntryDate: PropTypes.number,
            Duration: PropTypes.number,
            Note: PropTypes.string,
            EmployeeApproved: PropTypes.bool,
            Approved: PropTypes.bool,
        })),
        approved: PropTypes.bool,
        approvedByName: PropTypes.string,
        approvalTime: PropTypes.string,
        employeeApproved: PropTypes.bool,
        employeeApprovalTime: PropTypes.string,
        getUserInfo: PropTypes.func.isRequired,
        approvePayPeriod: PropTypes.func.isRequired,
    };
    static defaultProps = {
        weeks: [],
        entries: [],
    };

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePayPeriod = this.onChangePayPeriod.bind(this);
    }

    onSubmit(ev) {
        ev.preventDefault();
        const {approved} = this.props;
        if (approved) {
            return;
        }
        this.props.approvePayPeriod();
    }

    onChangePayPeriod(id) {
        this.props.getUserInfo(id);
    }

    render() {
        const {weeks, entries, idPayPeriod, approved, approvalTime, approvedByName, employeeApproved, employeeApprovalTime} = this.props;
        const hasErrors = weeks[0].errors + weeks[1].errors > 0;
        const plTotal = entries.filter(entry => entry.idEntryType === ENTRY_PL).reduce((acc, entry) => acc + entry.Duration, 0);
        const isClockedIn = entries.reduce((acc, entry) => acc || entry.isClockedIn, false);

        const w1ClassName = {'bg-danger': !!weeks[0].errors, 'text-light': !!weeks[0].errors};
        const w2ClassName = {'bg-danger': !!weeks[1].errors, 'text-light': !!weeks[1].errors};

        return (
            <div>
                <h3>Pay Period</h3>
                <div className="mb-3">
                    <PayPeriodSelect value={idPayPeriod} onChange={this.onChangePayPeriod}/>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="tc__approval-form">
                        <FormGroupText label="Week 1" className={w1ClassName}>
                            <Time seconds={weeks[0].duration}/>
                        </FormGroupText>
                        <FormGroupText label="Week 2" className={w2ClassName}>
                            <Time seconds={weeks[1].duration}/>
                        </FormGroupText>
                        <FormGroupText label="Overtime">
                            <Time seconds={weeks[0].overtime + weeks[1].overtime}/>
                        </FormGroupText>
                        <FormGroupText label="Total">
                            <Time seconds={weeks[0].duration + weeks[1].duration}/>
                        </FormGroupText>
                        <FormGroupText label="P/L">
                            <Time seconds={plTotal}/>
                        </FormGroupText>
                    </div>

                    {!employeeApproved && !isClockedIn && (
                        <button type="submit" className={classNames('btn btn-block', {
                            'btn-danger': hasErrors,
                            'btn-primary': !hasErrors,
                        })} disabled={hasErrors}>
                            Approve Pay Period
                        </button>
                    )}
                    {isClockedIn && (
                        <Alert type="info" title="Notice:">You are currently still clocked in for this pay period.</Alert>
                    )}
                    {employeeApproved && (
                        <Alert title="Approved:" type="success">You have approved this pay period
                            at <strong>{parse(employeeApprovalTime, parseFormat, new Date()).toLocaleString()}</strong>
                        </Alert>
                    )}
                    {approved && (
                        <Alert title="Supervisor Approved:" type="success">{approvedByName} approved this pay period
                            at <strong>{parse(approvalTime, parseFormat, new Date()).toLocaleString()}</strong>
                        </Alert>
                    )}
                    {hasErrors && (
                        <Alert title="Notice:" type="danger">Please see your supervisor to fix the following errors
                            before approving your time.</Alert>
                    )}
                </form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PayPeriodApproveSummary);
