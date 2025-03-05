import React, {Fragment, useEffect, useRef, useState} from 'react';
import {toSeconds} from "../../utils";


export interface TimeProps {
    hours?: number,
    minutes?: number,
    seconds?: number,
    showSeconds?: boolean,
    showIncrement?: boolean,
}


const Time = ({
                  hours = 0,
                  minutes = 0,
                  seconds = 0,
                  showSeconds,
                  showIncrement
              }: TimeProps) => {
    const timerRef = useRef<number>(0);
    const [time, setTime] = useState(toSeconds({hours, minutes, seconds}));

    useEffect(() => {
        setTime(toSeconds({hours, minutes, seconds}));
    }, [hours, minutes, seconds]);

    useEffect(() => {
        if (showIncrement) {
            timerRef.current = window.setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        }

        return function () {
            window.clearInterval(timerRef.current);
        }
    }, []);


    return (
        <span>
            <TimeMinutes value={time}/>
            {showSeconds && (
                <>:<TimeSeconds value={time}/></>
            )}
        </span>
    );
}

function TimeMinutes({value}: { value: number }) {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value - (hours * 3600)) / 60);
    return (
        <span>
                {hours}:<span>{minutes.toString().padStart(2, '0')}</span>
            </span>
    )
}

function TimeSeconds({value}: { value: number }) {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value - (hours * 3600)) / 60);
    const seconds = Math.floor(value - (hours * 3600) - (minutes * 60));

    return (<span>{seconds.toString().padStart(2, '0')}</span>)
}

export default Time
