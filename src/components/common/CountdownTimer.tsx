import {useCallback, useEffect, useRef, useState} from 'react';
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
    startDelay?: number,
    duration?: number,
    rate?: number,
    onComplete: () => void,
}

export default function CountdownTimer({startDelay = 0, duration = 100, rate = 100, onComplete}: CountdownTimerProps) {
    const timeoutRef = useRef<number>(0);
    const intervalRef = useRef<number>(0);
    const [remaining, setRemaining] = useState(duration);
    const startTimer = useCallback(() => {
        setRemaining(duration);
        intervalRef.current = window.setInterval(() => {
            setRemaining(remaining => remaining - 1);
        }, rate);
    }, [duration, rate])


    useEffect(() => {
        window.clearTimeout(timeoutRef.current);
        window.clearInterval(intervalRef.current);
        timeoutRef.current = window.setTimeout(startTimer, startDelay);
        return function () {
            window.clearInterval(intervalRef.current);
            window.clearTimeout(timeoutRef.current);
        }
    }, [startDelay, startTimer]);

    useEffect(() => {
        if (remaining <= 0) {
            window.clearTimeout(timeoutRef.current);
            window.clearInterval(intervalRef.current);
            onComplete();
        }
    }, [remaining, onComplete])



    if (!duration || !remaining) {
        return null;
    }
    const pct = remaining / duration;
    return (
        <ProgressBar variant={calcVariant(pct)} now={pct * 100} className="my-3"></ProgressBar>
    )
}
