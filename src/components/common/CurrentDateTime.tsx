import {useEffect, useRef, useState} from 'react';
import styled from "@emotion/styled";
import {useVisibility} from "@/hooks/useVisibility.ts";

const DateTimeContainer = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

    &--vertical {
        flex-direction: column;
    }
    @media screen and (max-width: 767px) {
        flex-direction: column;
    }
`

const DateContainer = styled.div`
    font-size: 1.5rem;
    flex: 1 1 50%;
    @media screen and (max-width: 767px) {
        font-size: 3vw;
    }
    @media screen and (max-width: 480px) {
        font-size: 5vw;
    }
`

const TimeContainer = styled.div`
    font-size: 2.5rem;
    flex: 1 1 50%;
    @media screen and (max-width: 767px) {
        font-size: 6vw;
    }
    @media screen and (max-width: 480px) {
        font-size: 8vw;
    }
`
export default function CurrentDateTime() {
    const timerRef = useRef<number>(0);
    const [value, setValue] = useState(new Date().valueOf());
    const visible = useVisibility();

    useEffect(() => {
        if (!visible) {
            return;
        }
        timerRef.current = window.setInterval(() => {
            setValue(new Date().valueOf());
        }, 1000);

        return function cleanUp() {
            window.clearInterval(timerRef.current);
        }
    }, [visible])

    const now = new Date(value);
    return (
        <DateTimeContainer>
            <DateContainer>
                <div>{now.toLocaleDateString(undefined, {weekday: 'long'})}</div>
                <div>{now.toLocaleDateString()}</div>
            </DateContainer>
            <TimeContainer>{now.toLocaleTimeString()}</TimeContainer>
        </DateTimeContainer>
    );
}
