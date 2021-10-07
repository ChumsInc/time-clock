import React from 'react';
import classNames from 'classnames';

export interface BannerIndicatorProps {
    active: boolean,
    onClick: () => void,
}
const BannerIndicator:React.FC<BannerIndicatorProps> = ({active, onClick}) => {
    return (
        <button type="button" data-bs-target={'#tc--banners'} className={classNames({active})} onClick={() => onClick()} />
    );
};

export default BannerIndicator;
