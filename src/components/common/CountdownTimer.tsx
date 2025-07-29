import {useEffect, useState} from 'react';
import {ProgressBar} from "react-bootstrap";
import type {Variant} from "react-bootstrap/types";

const calcVariant = (pct: number): Variant => {
    if (pct > 0.75) {
        return 'success';
    }
    if (pct > 0.5) {
        return 'info';
    }
    if (pct > 0.25) {
        return 'warning';
    }
    return 'danger';
}

export interface CountdownTimerProps {
    startOffset?: number,
    duration?: number,
    rate?: number,
    onComplete: () => void,
}

const CountdownTimer = ({startOffset = 0, duration = 100, rate = 100, onComplete}: CountdownTimerProps) => {
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
    return (
        <ProgressBar variant={calcVariant(pct)} now={pct * 100} className="my-3"></ProgressBar>
    )
}

export default CountdownTimer;
