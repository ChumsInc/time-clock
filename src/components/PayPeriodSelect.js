import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {dateRange} from "./DateRange";
import classNames from 'classnames';
import {selectPayPeriod} from '../actions/user';

function mapStateToProps({payPeriod}) {
    const {list} = payPeriod;
    return {
        payPeriods: list
    };
}

const mapDispatchToProps = {
    selectPayPeriod,
};

class PayPeriodSelect extends Component {
    static propTypes = {
        payPeriods: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            StartDate: PropTypes.number,
            EndDate: PropTypes.number,
            completed: PropTypes.bool,
        })),
        value: PropTypes.number,
        className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        payPeriods: [],
        className: '',
        value: 0,
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(ev) {
        const value = Number(ev.target.value);
        // this.props.selectPayPeriod(value);
        this.props.onChange(value);
    }

    render() {
        const {value, payPeriods, className} = this.props;
        return (
            <select className={classNames("form-control form-control-lg", className)} value={String(value)} onChange={this.onChange}>
                <optgroup label="Current">
                    {payPeriods
                        .filter(pp => !pp.completed)
                        .sort((a,b) => b.StartDate - a.StartDate)
                        .map(payPeriod => (
                            <option key={payPeriod.id} value={String(payPeriod.id)}>
                                {dateRange(payPeriod.StartDate, payPeriod.EndDate)}
                            </option>
                        ))}
                </optgroup>
                <optgroup label="Past">
                    {payPeriods
                        .filter(pp => !!pp.completed)
                        .sort((a,b) => b.StartDate - a.StarDate)
                        .map(payPeriod => (
                            <option key={payPeriod.id} value={payPeriod.id}>
                                {dateRange(payPeriod.StartDate, payPeriod.EndDate)}
                            </option>
                        ))}
                </optgroup>
            </select>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PayPeriodSelect);
