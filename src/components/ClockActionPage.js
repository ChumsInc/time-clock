import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import CurrentDateTime from "./CurrentDateTime";
import LoginInput from "./LoginInput";
import {clockAction, clearUser} from '../actions/user';
import {CLOCK_ACTION_CLOCK_IN, CLOCK_ACTION_CLOCK_OUT} from "../constants";
import ClockActionButtons from "./ClockActionButtons";
import CountdownTimer from "./CountdownTimer";
import EmployeeName from "./EmployeeName";
import Alert from "./Alert";
import ActionTimeAlert from "./ActionTimeAlert";

function mapStateToProps(state) {
    const {code, user, entry, requiresOverride, alert, overrideText, clockActionResult, employee} = state.user;
    return {
        code,
        user,
        employee,
        entry,
        alert,
        requiresOverride,
        overrideText,
        clockActionResult,
    };
}

const mapDispatchToProps = {
    clockAction,
    clearUser,
};

class ClockActionPage extends Component {
    static propTypes = {
        code: PropTypes.string,
        employee: PropTypes.shape({

        }),
        entry: PropTypes.shape({

        }),
        alert: PropTypes.string,
        requiresOverride: PropTypes.bool,
        overrideText: PropTypes.string,
        clockActionResult: PropTypes.bool,
        clockAction: PropTypes.func.isRequired,
        clearUser: PropTypes.func.isRequired,
    };
    static defaultProps = {
        code: '',
        employee: {},
        entry: {},
        alert: '',
        requiresOverride: false,
        overrideText: '',
        clockActionResult: false
    };

    state = {
        action: '',
    }

    constructor(props) {
        super(props);
        this.timer = null;
        this.onClockIn = this.onClockIn.bind(this);
        this.onClockOut = this.onClockOut.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onTimeoutUser = this.onTimeoutUser.bind(this);
    }

    componentDidMount() {
        this.props.clearUser();
        this.onTimeoutUser();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.code === '' && this.state.action !== '') {
            this.setState({action: ''});
        }
        this.onTimeoutUser();
    }
    
    onTimeoutUser() {
        clearTimeout(this.timer);
        if (!!this.props.employee.id) {
            this.timer = setTimeout(this.props.clearUser, 30 * 1000);
        }
    }


    onClockIn() {
        this.setState({action: CLOCK_ACTION_CLOCK_IN});
        this.props.clockAction(CLOCK_ACTION_CLOCK_IN, this.props.requiresOverride);
    }

    onClockOut() {
        this.setState({action: CLOCK_ACTION_CLOCK_OUT});
        this.props.clockAction(CLOCK_ACTION_CLOCK_OUT, this.props.requiresOverride);
    }

    onCancel() {
        this.setState({action: ''});
        this.props.clearUser();
    }

    onOverride() {}

    render() {
        const {code, entry, requiresOverride, alert, overrideText, clockActionResult} = this.props;
        const {action} = this.state;
        return (
            <form className="tc__clock-action" onSubmit={(ev) => ev.preventDefault()}>
                <CurrentDateTime />
                <hr />
                {!entry.id && (
                    <LoginInput/>
                )}
                <EmployeeName />
                {(!entry.id || !!requiresOverride) && (
                    <ClockActionButtons onClockOut={this.onClockOut}
                                        onClockIn={this.onClockIn}
                                        onCancel={this.onCancel}
                                        requiresOverride={requiresOverride} overrideText={overrideText} action={action}/>
                )}
                {!!alert && (
                    <div className="my-1" dangerouslySetInnerHTML={{__html: alert}} />
                )}
                {!!entry.id && !clockActionResult && (
                    <Fragment>
                        {!requiresOverride && (
                            <CountdownTimer startOffset={2000} onComplete={this.onCancel}/>
                        )}
                        {!!entry.isClockedIn && (
                            <ActionTimeAlert time={entry.clockInTime} message="You clocked in" type="success" />
                        )}
                        {!entry.isClockedIn && !!entry.clockOutTime && (
                            <ActionTimeAlert time={entry.clockOutTime} message="You clocked out" type="success" />
                        )}
                        <button type="button" className="btn btn-primary btn-block" onClick={this.onCancel}>
                            Done
                        </button>
                    </Fragment>
                )}
                {!!clockActionResult && (
                    <Fragment>
                        <CountdownTimer startOffset={2000} onComplete={this.onCancel}/>
                        <button type="button" className="btn btn-outline-secondary btn-block" onClick={this.onCancel}>
                            Confirm
                        </button>
                    </Fragment>
                )}
            </form>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClockActionPage);
