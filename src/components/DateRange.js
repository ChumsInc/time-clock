import React, {Fragment} from 'react';

export const dateRange = (start, end) => `${new Date(start * 1000).toLocaleDateString()} - ${new Date(end * 1000).toLocaleDateString()}`;

const DateRange = ({start, end}) => {
    return (
        <Fragment>
            {new Date(start * 1000).toLocaleDateString()}
            {' '}&mdash;{' '}
            {new Date(end * 1000).toLocaleDateString()}
        </Fragment>
    )
}

export default DateRange;
