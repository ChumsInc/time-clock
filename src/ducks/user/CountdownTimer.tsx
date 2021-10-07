import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

const calcBarClassName = (pct:number) => ({
    'progress-bar': true,
    'bg-success': pct > 0.75,
    'bg-info': pct > 0.50 && pct <= 0.75,
    'bg-warning': pct > 0.25 && pct <= 0.50,
    'bg-danger': pct > 0.10 && pct <= 0.25,
    'bg-dark': pct <= 0.10,
});

export interface CountdownTimerProps {
    startOffset?: number,
    duration?: number,
    rate?: number,
    onComplete: () => void,
}

const CountdownTimer: React.FC<CountdownTimerProps> =
    ({startOffset = 0, duration = 100, rate = 100, onComplete}) => {
        const [offsetTimeout, setOffsetTimeout] = useState(0);
        const [interval, setInterval] = useState(0);

        const [remaining, setRemaining] = useState(duration);

        useEffect(() => {
            window.clearTimeout(offsetTimeout);
            window.clearInterval(interval);
            if (startOffset > 50) {
                const timeout = window.setTimeout(startTimer, startOffset);
                setOffsetTimeout(timeout)
            } else {
                startTimer();
            }
            return function () {
                window.clearInterval(interval);
                window.clearTimeout(offsetTimeout);
            }
        }, []);

        useEffect(() => {
            if (remaining <= 0) {
                window.clearTimeout(offsetTimeout);
                window.clearInterval(interval);
                onComplete();
            }
        }, [remaining])

        const startTimer = () => {
            setRemaining(duration);
            const intervalHandler = window.setInterval(() => {
                setRemaining(remaining => remaining - 1);
            }, rate);
            setInterval(intervalHandler);
        }


        if (!duration || !remaining) {
            return null;
        }
        const pct = remaining / duration;
        const barClassName = calcBarClassName(pct);
        const barWidth = `${pct * 100}%`
        return (
            <div className="progress my-1">
                <div className={classNames(barClassName)} role="progressbar" style={{width: barWidth}}
                     aria-valuenow={pct * 100} aria-valuemin={0} aria-valuemax={100}/>
            </div>
        );
    }

export default CountdownTimer;
