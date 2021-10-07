import React from 'react';


export const dateRange = (start: number, end: number): string => `${new Date(start * 1000).toLocaleDateString()} - ${new Date(end * 1000).toLocaleDateString()}`;

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
