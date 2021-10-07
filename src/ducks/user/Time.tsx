import React, {Fragment, useEffect, useState} from 'react';
import {calcTimeUnits, toSeconds} from "../../utils";

const formatUnits = (val: number): string => String(val).padStart(2, '0');

export interface TimeProps {
    hours?: number,
    minutes?: number,
    seconds?: number,
    showSeconds?: boolean,
    showIncrement?: boolean,
}


const Time: React.FC<TimeProps> =
    ({
         hours = 0,
         minutes= 0,
         seconds= 0,
         showSeconds,
         showIncrement
     }) => {
        let timer = 0;
        const [time, setTime] = useState(toSeconds({hours, minutes, seconds}));

        useEffect(() => {
            if (showIncrement) {
                timer = window.setInterval(() => {
                    setTime(time + 1);
                }, 1000);
            }
            return function () {
                window.clearInterval(timer);
            }
        }, []);


        const {hours: _hours, minutes: _minutes, seconds: _seconds} = calcTimeUnits(time);
        return (
            <span>
                {_hours}
                :{formatUnits(_minutes)}
                {showSeconds && (
                    <Fragment>:{formatUnits(_seconds)}</Fragment>
                )}
            </span>
        );
    }

export default Time
