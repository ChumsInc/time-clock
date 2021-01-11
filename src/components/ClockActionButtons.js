import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CLOCK_ACTION_CLOCK_IN, CLOCK_ACTION_CLOCK_OUT} from "../constants";

export default class ClockActionButtons extends Component {
    static propTypes = {
        code: PropTypes.string,
        action: PropTypes.string,
        requiresOverride: PropTypes.bool,
        overrideText: PropTypes.string,
        onClockIn: PropTypes.func.isRequired,
        onClockOut: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
    };

    static defaultProps = {
        code: '',
        action: '',
        requiresOverride: false
    };

    render() {
        const {requiresOverride, action, overrideText} = this.props;
        return (
            <div className="tc__clock-action--buttons mt-3">
                {(!requiresOverride || action === CLOCK_ACTION_CLOCK_IN) && (
                    <button type="submit" className="btn btn-success btn-large"
                            onClick={this.props.onClockIn}>
                        {overrideText || 'Clock In'} <span className="material-icons">schedule</span>
                    </button>
                )}
                {(!requiresOverride || action === CLOCK_ACTION_CLOCK_OUT) && (
                    <button type="submit" className="btn btn-danger btn-large"
                            onClick={this.props.onClockOut}>
                        {overrideText || 'Clock Out'} <span className="material-icons">time_to_leave</span>
                    </button>
                )}
                {!!requiresOverride && (
                    <button type="reset" className="btn btn-outline-secondary" onClick={this.props.onCancel}>
                        Cancel <span className="material-icons">cancel</span>
                    </button>
                )}
            </div>
        );
    }
}
