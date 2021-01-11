import React from 'react';
import classNames from 'classnames';
import {CLOCK_IMAGE_URL} from "../constants";


const BannerItem = ({filename, overlay, active}) => {
    const imgUrl = encodeURI(CLOCK_IMAGE_URL.replace(':filename', filename));
    const bgImgUrl = !!filename ? `url(${imgUrl})` : undefined;
    const className = {
        'carousel-item': true,
        'active': !!active,
        'hasOverlay': !!overlay,
        'banner-image': !!filename,
    }
    return (
        <div className={classNames(className)} style={{backgroundImage: bgImgUrl}}>
            {!!overlay && (
                <div className="carousel-caption" dangerouslySetInnerHTML={{__html: overlay}} />
            )}
        </div>
    );
};

export default BannerItem;
