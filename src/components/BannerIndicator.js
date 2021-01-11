import React from 'react';
import classNames from 'classnames';

const BannerIndicator = ({id, active, onClick}) => {
    return (
        <li className={classNames({active})} onClick={() => onClick(id)} />
    );
};

export default BannerIndicator;
