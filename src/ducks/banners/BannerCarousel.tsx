import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BannerIndicator from "./BannerIndicator";
import BannerItem from "./BannerItem";
import styled from "@emotion/styled";
import {selectAllBanners, selectBannersStatus} from "@/ducks/banners/index";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {loadBanners} from "@/ducks/banners/actions";
import {Carousel} from "react-bootstrap";

const CarouselInner = styled.div`
    background-color: transparent;
`

const BannerCarousel: React.FC = () => {
    const dispatch = useAppDispatch();
    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<number>(0);
    const banners = useAppSelector(selectAllBanners);
    const status = useAppSelector(selectBannersStatus);
    const [index, setIndex] = useState(0);

    const [size, setSize] = useState(600);
    const [active, setActive] = useState(0);
    const [intervalHandle, setIntervalHandle] = useState(0);

    const getWidth = useCallback(() => {
        if (carouselRef && carouselRef.current) {
            return carouselRef.current.clientWidth;
        }
        return 300;
    }, [carouselRef])

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        dispatch(loadBanners());
        resizeHandler();
        return () => {
            window.removeEventListener('resize', resizeHandler);
            window.clearTimeout(intervalRef.current);
        }
    }, []);

    const resizeHandler = () => {
        setSize(getWidth());
    }

    useEffect(() => {
        if (status === 'loading') {
            window.clearTimeout(intervalRef.current);
            return;
        }
        if (banners.length > 1) {
            startCarousel();
        }
    }, [banners, status]);


    useEffect(() => {
        const resizeListener = () => {
            setSize(getWidth());
        }
        window.addEventListener('resize', resizeListener);
        setSize(getWidth());
        if (banners.length > 0) {
            startCarousel();
        }
        return function cleanUp() {
            window.clearInterval(intervalHandle);
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (banners.length > 0) {
            startCarousel();
        }
        return function cleanUp() {
            window.clearInterval(intervalHandle);
        }
    }, [banners.length]);

    const rotateCarousel = () => {
        setActive(active => (active + 1) % banners.length);
    }

    const startCarousel = () => {
        window.clearInterval(intervalRef.current);
        setActive(0);
        if (banners.length > 1) {
            intervalRef.current = window.setInterval(rotateCarousel, 5000);
        }
    }

    const stopCarousel = () => {
        console.log('stopCarousel()');
        window.clearInterval(intervalRef.current);
    }

    const onClickIndicator = (index: number) => {
        stopCarousel();
        setActive(index);
        // startCarousel();
    }


    const maxHeight = `${size}px`;
    const height = `${size}px`;

    return (
        <Carousel className="carousel slide tc__banner-carousel">
            <div className="carousel-indicators">
                {banners.map((banner, index) => (
                    <BannerIndicator key={banner.id} active={index === active}
                                     onClick={() => onClickIndicator(index)}/>)
                )}
            </div>
            <CarouselInner style={{maxHeight, height}} ref={carouselRef} onMouseOver={stopCarousel}
                 onMouseOut={startCarousel}>
                {banners.map((banner, index) => (
                    <BannerItem key={banner.id} banner={banner} active={index === active}/>
                ))}
            </CarouselInner>
        </Carousel>
    )
}

export default BannerCarousel;
