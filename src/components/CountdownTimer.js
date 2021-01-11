import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const calcBarClassName = (pct) => ({
    'progress-bar': true,
    'bg-success': pct > 0.75,
    'bg-info': pct > 0.50 && pct <= 0.75,
    'bg-warning': pct > 0.25 && pct <= 0.50,
    'bg-danger': pct > 0.10 && pct <= 0.25,
    'bg-dark': pct <= 0.10,
});

export default class CountdownTimer extends Component {
    static propTypes = {
        startOffset: PropTypes.number,
        duration: PropTypes.number,
        rate: PropTypes.number,
        onComplete: PropTypes.func,
    };

    static defaultProps = {
        startOffset: 0,
        duration: 100,
        rate: 100,
    };

    state = {
        offsetTimer: null,
        timer: null,
        value: 0,
    }

    constructor(props) {
        super(props);
        this.decrementTimer = this.decrementTimer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }


    componentDidMount() {
        this.prepStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.startOffset > prevProps.startOffset) {
            this.prepStart();
        } else if (this.state.value === 0 && prevState.value > 0) {
            this.stopTimer();
        }
    }

    prepStart() {
        clearTimeout(this.state.offsetTimer);
        clearInterval(this.state.timer);
        const now = Date.now();
        const start = now + this.props.startOffset;
        if (start - now > 50) {
            const offsetTimer = setTimeout(this.startTimer, start - now);
            this.setState({offsetTimer, value: null});
        } else {
            this.startTimer();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.state.offsetTimer);
        clearInterval(this.state.timer);
    }

    startTimer() {
        const {rate, duration} = this.props;
        const timer = setInterval(this.decrementTimer, rate);
        this.setState({timer, value: duration});
    }

    stopTimer() {
        clearTimeout(this.state.offsetTimer);
        clearInterval(this.state.timer);
        this.setState({timer: null, offsetTimer: null, value: null});
        this.props.onComplete();
    }

    decrementTimer() {
        const value = this.state.value - 1;
        this.setState({value});
    }


    render() {
        const {duration} = this.props;
        const {value} = this.state;
        if (!duration || !value) {
            return null;
        }
        const pct = value / duration;
        const barClassName = calcBarClassName(pct);
        const barWidth = `${pct * 100}%`
        return (
            <div className="progress my-1">
                <div className={classNames(barClassName)} role="progressbar" style={{width: barWidth}}
                     aria-valuenow={pct * 100} aria-valuemin={0} aria-valuemax={100}/>
            </div>
        );
    }
}
