import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import EmployeeName from "./EmployeeName";
import EmployeePlSummary from "./EmployeePLSummary";
import EmployeeEntry from "./EmployeeEntry";
import {clearUser} from '../actions/user';
import EmployeePayPeriodSummary from "./EmployeePayPeriodSummary";

function mapStateToProps({user}) {
    const {EntryDate, clockInTime, clockOutTime, errors, isClockedIn, duration, Note} = user.entry;
    return {
        EntryDate
    };
}

const mapDispatchToProps = {
    clearUser
};

class UserInfo extends Component {
    static propTypes = {
        clearUser: PropTypes.func.isRequired,
    };
    static defaultProps = {};

    render() {
        return (
            <div className="tc__user-info">
                <EmployeeName />
                <EmployeeEntry />
                <EmployeePayPeriodSummary />
                <EmployeePlSummary />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo);
