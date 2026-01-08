import {useEffect, useRef, useState} from 'react';
import {toSeconds} from "@/utils/date-utils.ts";


export interface TimeProps {
    hours?: number,
    minutes?: number,
    seconds?: number,
    showSeconds?: boolean,
    showIncrement?: boolean,
}


export default function TimeDisplay({
                                        hours = 0,
                                        minutes = 0,
                                        seconds = 0,
                                        showSeconds,
                                        showIncrement
                                    }: TimeProps) {
    const value = toSeconds({hours, minutes, seconds});
    return (
        <TimeContent durationInSeconds={value} key={value} showSeconds={showSeconds} showIncrement={showIncrement}/>
    )
}

interface TimeContentProps {
    durationInSeconds: number,
    showIncrement?: boolean,
    showSeconds?: boolean,
}
function TimeContent({durationInSeconds, showSeconds, showIncrement}: TimeContentProps) {
    const [time, setTime] = useState(durationInSeconds);
    const timerRef = useRef<number>(0);

    useEffect(() => {
        if (showIncrement) {
            timerRef.current = window.setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        }
        return () => {
            window.clearInterval(timerRef.current);
        }
    }, [showIncrement]);
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
