import React from 'react';
import classNames from 'classnames';
import {CLOCK_IMAGE_URL} from "../../constants";
import {BannerImage} from "../../types";
import styled from '@emotion/styled';

const CarouselItem = styled.div`
    .next,
    .prev,
    .active {
        display: flex;
    }
    align-items: center;
    justify-content: space-around;
    height: 100%;
`

export interface BannerItemProps {
    banner: BannerImage,
    active: boolean,
}
const BannerItem:React.FC<BannerItemProps> = ({banner, active}) => {
    const {filename, overlay} = banner;
    const imgUrl = encodeURI(CLOCK_IMAGE_URL.replace(':filename', filename));
    const bgImgUrl = !!filename ? `url(${imgUrl})` : undefined;

    const className = {
        'active': active,
        'hasOverlay': !!overlay,
        'banner-image': !!filename,
    }
    return (
        <CarouselItem className={classNames(className)} style={{backgroundImage: bgImgUrl}}>
            {!!overlay && (
                <div className="carousel-caption" dangerouslySetInnerHTML={{__html: overlay}} />
            )}
        </CarouselItem>
    );
};

export default BannerItem;
