import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";

let timer: number = 0;

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
const CurrentDateTime = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        timer = window.setInterval(() => {
            setNow(new Date());
        }, 1000);

        return function cleanUp() {
            window.clearInterval(timer);
        }
    }, [])

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
export default CurrentDateTime;
