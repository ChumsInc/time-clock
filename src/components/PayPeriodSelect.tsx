import {type ChangeEvent, useId} from 'react';
import {selectClosedPayPeriods, selectOpenPayPeriods} from "@/ducks/payPeriods";
import {FormSelect, type FormSelectProps, InputGroup, type InputGroupProps} from "react-bootstrap";
import {useAppSelector} from "@/app/configureStore";
import {payPeriodDateRange, payPeriodLocaleDateString} from "@/ducks/payPeriods/utils";

export interface PayPeriodSelectProps extends Omit<InputGroupProps, 'onChange'> {
    value: number | null;
    onChange: (id: number) => void;
    selectProps?: Omit<FormSelectProps, 'value' | 'onChange'>
}

export default function PayPeriodSelect({value, onChange, selectProps, ...rest}: PayPeriodSelectProps) {
    const openPayPeriods = useAppSelector(selectOpenPayPeriods);
    const closedPayPeriods = useAppSelector(selectClosedPayPeriods);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        const value = Number(ev.target.value);
        onChange(value);
    }

    return (
        <InputGroup {...rest}>
            <InputGroup.Text as="label" htmlFor={selectProps?.id ?? id} aria-label="Pay Period">
                <span className="bi-calendar3-range" aria-hidden="true" />
            </InputGroup.Text>

            <FormSelect id={id} {...selectProps} value={`${value}`} onChange={changeHandler}>
                <optgroup label="Current">
                    {openPayPeriods
                        .map(payPeriod => (
                            <option key={payPeriod.id} value={payPeriod.id}
                                    aria-label={payPeriodLocaleDateString(payPeriod)}>
                                {payPeriodDateRange(payPeriod)}
                            </option>
                        ))}
                </optgroup>
                <optgroup label="Past">
                    {closedPayPeriods
                        .map(payPeriod => (
                            <option key={payPeriod.id} value={payPeriod.id}
                                    aria-label={payPeriodLocaleDateString(payPeriod)}>
                                {payPeriodDateRange(payPeriod)}
                            </option>
                        ))}
                </optgroup>
            </FormSelect>
        </InputGroup>
    );
}
