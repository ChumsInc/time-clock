import React from 'react';


export interface DateRangeProps {
    start: number,
    end: number
}

const DateRange: React.FC<DateRangeProps> = ({start, end}) => {
    return (
        <>
            <span className="tc--date">{new Date(start * 1000).toLocaleDateString()}</span>
            <span className="tc--date-separator">&mdash;</span>
            <span className="tc--date">{new Date(end * 1000).toLocaleDateString()}</span>
        </>
    )
}

export default DateRange;
