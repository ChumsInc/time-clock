import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Time from "./Time";
import {getUserInfo} from '../actions/user';
import ProgressBar from "./ProgressBar";

function mapStateToProps({user}) {
    const {id, EntryDate, Duration, Actions, clockInTime, clockOutTime, isClockedIn, errors} = user.entry;
    const loading = user.loading;
    return {
        id, EntryDate, Duration, Actions, clockInTime, clockOutTime, isClockedIn, errors, loading,
    };
}

const mapDispatchToProps = {getUserInfo};

class EmployeeEntry extends Component {
    static propTypes = {
        id: PropTypes.number,
        title: PropTypes.string,
        EntryDate:PropTypes.number,
        Duration: PropTypes.number,
        Actions: PropTypes.array,
        clockInTime: PropTypes.number,
        clockOutTime: PropTypes.number,
        isClockedIn: PropTypes.bool,
        errors: PropTypes.array,
        loading: PropTypes.bool,
        getUserInfo: PropTypes.func.isRequired,
    };
    static defaultProps = {
        id: 0,
        title: 'Entry Details',
        EntryDate: 0,
        Duration: 0,
        Actions: [],
        clockInTime: 0,
        clockOutTime: 0,
        isClockedIn: false,
        errors: [],
        loading: false,
    };

    componentDidMount() {
        if (!this.props.id && !this.props.loading) {
            this.props.getUserInfo();
        }
    }


    render() {
        const {title, EntryDate, Duration, Actions, clockInTime, clockOutTime, isClockedIn, errors, loading} = this.props;
        return (
            <div className="tc__user-info--section">
                <h5>Latest Entry</h5>
                {!!loading && (
                    <ProgressBar striped={true} />
                )}
                <table className="table table-hover">
                    <caption>{new Date(EntryDate * 1000).toLocaleDateString()}</caption>
                    <tbody>
                    <tr>
                        <th>Clock In</th>
                        <td className="right">
                            {!clockInTime && <span>Missing</span>}
                            {!!clockInTime && <span>{new Date(clockInTime * 1000).toLocaleTimeString()}</span>}
                        </td>
                    </tr>
                    <tr>
                        <th>Clock Out</th>
                        <td className="right">
                            {!clockOutTime && <span>-</span>}
                            {!!clockOutTime && <span>{new Date(clockOutTime * 1000).toLocaleTimeString()}</span>}
                        </td>
                    </tr>
                    <tr>
                        <th>Duration</th>
                        <td className="right">
                            {!clockInTime && <span>Error</span>}
                            {!!Duration && (
                                <Time seconds={Duration}/>
                            )}
                            {!!clockInTime && !clockOutTime && (
                                <Time seconds={Math.floor(Date.now() / 1000) - clockInTime} showSeconds={true} showIncrement={true} />
                            )}
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeEntry);
