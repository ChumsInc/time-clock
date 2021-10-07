import React, {useEffect, useState} from 'react';
import './CurrentDateTime.scss';

let timer: number = 0;

const CurrentDateTime: React.FC = () => {
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
        <div className="tc__date-time">
            <div className="tc__date-time--date">
                <div className="tc__date-time--date">{now.toLocaleDateString(undefined, {weekday: 'long'})}</div>
                <div className="tc__date-time--date">{now.toLocaleDateString()}</div>
            </div>
            <div className="tc__date-time--time">{now.toLocaleTimeString()}</div>
        </div>
    );
}
export default CurrentDateTime;
