import React, {ChangeEvent} from 'react';
import {useSelector} from 'react-redux';
import {dateRange} from "../../components/DateRange";
import classNames from 'classnames';
import {selectClosedPayPeriods, selectOpenPayPeriods} from "./index";

export interface PayPeriodSelectProps {
    id: number,
    className?: string,
    onChange: (id: number) => void,
}

const PayPeriodSelect: React.FC<PayPeriodSelectProps> = ({id, className, onChange}) => {
    const openPayPeriods = useSelector(selectOpenPayPeriods);
    const closedPayPeriods = useSelector(selectClosedPayPeriods);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        const value = Number(ev.target.value);
        onChange(value);
    }

    return (
        <div className="input-group">
            <span className="input-group-text bi-calendar3-range" />
            <select className={classNames("form-select form-select-lg", className)} value={id} onChange={changeHandler}>
                <optgroup label="Current">
                    {openPayPeriods
                        .map(payPeriod => (
                            <option key={payPeriod.id} value={payPeriod.id}>
                                {dateRange(payPeriod.StartDate, payPeriod.EndDate)}
                            </option>
                        ))}
                </optgroup>
                <optgroup label="Past">
                    {closedPayPeriods
                        .map(payPeriod => (
                            <option key={payPeriod.id} value={payPeriod.id}>
                                {dateRange(payPeriod.StartDate, payPeriod.EndDate)}
                            </option>
                        ))}
                </optgroup>
            </select>
        </div>
    );
}

export default PayPeriodSelect;
