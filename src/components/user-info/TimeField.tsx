import {useId} from 'react';
import classNames from "classnames";
import TimeDisplay, {type TimeProps} from "./TimeDisplay.tsx";
import styled from "@emotion/styled";

const TimeGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 0 0.25rem;

    .form-control {
        text-align: center;
    }

    .form-label {
        font-weight: bold;
        white-space: nowrap;
        margin-right: 0.5rem;
        flex: 0 0 25%;
        margin-bottom: 0;
    }

    @media screen and (min-width: 480px) {
        flex-direction: column;
        flex: 1 1 calc(20% - 0.25rem);
        .form-label {
            width: 100%;
            text-align: center;
        }
    }
`

export interface TimeFieldProps extends TimeProps {
    label: string,
    className?: string,
}

export default function TimeField({
                                      hours = 0,
                                      minutes = 0,
                                      seconds = 0,
                                      showIncrement,
                                      showSeconds,
                                      label,
                                      className = '',
                                  }: TimeFieldProps) {
    const id = useId();
    return (
        <TimeGroup>
            <label className="form-label" id={id}>{label}</label>
            <div className={classNames("form-control", className)} aria-describedby={id}>
                <TimeDisplay hours={hours} minutes={minutes} seconds={seconds}
                             showSeconds={showSeconds} showIncrement={showIncrement}/>
            </div>
        </TimeGroup>
    )
}
