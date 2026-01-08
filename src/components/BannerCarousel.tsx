import {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectAllBanners} from "@/ducks/banners";
import {loadBanners} from "@/ducks/banners/actions";
import Carousel, {type CarouselProps} from "react-bootstrap/Carousel";
import styled from "@emotion/styled";
import {useVisibility} from "@/hooks/useVisibility.ts";

const CarouselImage = styled.img`
    width: 100%;
    max-width: 100%;
    height: auto;
    padding: 1.5rem;
`;

const thirtyMinutes = 30 * 60 * 1000;

export interface BannerCarouselProps extends Omit<CarouselProps, 'activeIndex'|'onSelect'> {
    changeInterval?: number;
    reloadInterval?: number;
}
export default function BannerCarousel({reloadInterval, ...props}: BannerCarouselProps) {
    const dispatch = useAppDispatch();
    const banners = useAppSelector(selectAllBanners);
    const [index, setIndex] = useState<number>(0)
    const intervalRef = useRef<number>(0);
    const visible = useVisibility();

    useEffect(() => {
        dispatch(loadBanners());
        if (!visible) {
            return;
        }
        intervalRef.current = window.setInterval(() => {
            dispatch(loadBanners())
        }, reloadInterval ?? thirtyMinutes);

        return () => {
            window.clearInterval(intervalRef.current)
        }
    }, [visible, dispatch, reloadInterval]);

    return (
        <Carousel fade activeIndex={index} onSelect={setIndex} {...props}>
            {banners.map((banner) => (
                <Carousel.Item key={banner.id}>
                    <CarouselImage src={`/timeclock/images/${banner.filename}`} alt={banner.altText ?? 'Missing text'} />
                </Carousel.Item>
            ))}
        </Carousel>
    )
}
