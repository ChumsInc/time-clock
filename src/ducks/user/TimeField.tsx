import React from 'react';
import classNames from "classnames";
import Time, {TimeProps} from "./Time";

export interface TimeFieldProps extends TimeProps {
    label: string,
    className?: string,
}

const TimeField: React.FC<TimeFieldProps> =
    ({
         hours = 0,
         minutes = 0,
         seconds = 0,
         showIncrement,
         showSeconds,
         label,
         className = '',
     }) => {
        return (
            <div className="time-group">
                <label className="form-label">{label}</label>
                <div className={classNames("form-control", className)}>
                    <Time hours={hours} minutes={minutes} seconds={seconds}
                          showSeconds={showSeconds} showIncrement={showIncrement} />
                </div>
            </div>
        );
    };

export default TimeField;
