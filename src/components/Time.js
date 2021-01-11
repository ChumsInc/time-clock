import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {calcTimeUnits, toSeconds} from "../utils";
import {defaultProps_Time, propTypes_Time} from "../myPropTypes";

const formatUnits = (val) => String(val).padStart(2, '0');

export default class Time extends Component {
    static propTypes = {
        ...propTypes_Time,
    }
    static defaultProps = {
        ...defaultProps_Time,
    }

    state = {
        time: 0,
    }

    constructor(props) {
        super(props);
        this.timer = null;
        this.initTime = this.initTime.bind(this);
        this.incrementTime = this.incrementTime.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentDidMount() {
        this.initTime();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.hours !== prevProps.hours || this.props.minutes !== prevProps.minutes || this.props.seconds !== prevProps.seconds) {
            this.initTime();
        }
    }


    initTime() {
        const {hours, minutes, seconds, showIncrement} = this.props;
        const time = toSeconds({hours, minutes, seconds});
        this.setState({time});
        if (showIncrement) {
            clearInterval(this.timer);
            this.timer = setInterval(this.incrementTime, 1000);
        }
    }

    incrementTime() {
        const time = this.state.time + 1;
        this.setState({time});
    }


    render() {
        const {time} = this.state;
        const {showSeconds} = this.props;
        const {hours, minutes, seconds} = calcTimeUnits(time);
        return (
            <span>
                {hours}
                :{formatUnits(minutes)}
                {!!showSeconds && (
                    <Fragment>:{formatUnits(seconds)}</Fragment>
                )}
            </span>
        );
    }
}
