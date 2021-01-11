import React, {Component} from 'react';

export default class CurrentDateTime extends Component {

    state = {
        now: new Date(),
    }

    constructor(props) {
        super(props);
        this.updateCurrentTime = this.updateCurrentTime.bind(this);
    }

    componentDidMount() {
        this.timer = window.setInterval(this.updateCurrentTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    updateCurrentTime() {
        this.setState({now: new Date()});
    }

    render() {
        const {now} = this.state;
        return (
            <div className="tc__date-time">
                <div className="tc__date-time--date">
                    <div className="tc__date-time--date">{now.toLocaleDateString(undefined, {weekday: 'long'})}</div>
                    <div className="tc__date-time--date">{now.toLocaleDateString()}</div>
                </div>
                <div className="tc__date-time--time">{now.toLocaleTimeString()}</div>
            </div>
        );
    }
}
