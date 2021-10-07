import React from 'react';
import classNames from 'classnames';
import {CLOCK_IMAGE_URL} from "../../constants";
import {BannerImage} from "../../types";


export interface BannerItemProps {
    banner: BannerImage,
    active: boolean,
}
const BannerItem:React.FC<BannerItemProps> = ({banner, active}) => {
    const {filename, overlay} = banner;
    const imgUrl = encodeURI(CLOCK_IMAGE_URL.replace(':filename', filename));
    const bgImgUrl = !!filename ? `url(${imgUrl})` : undefined;

    const className = {
        'carousel-item': true,
        'active': active,
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
