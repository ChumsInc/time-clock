import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BannerIndicator from "./BannerIndicator";
import BannerItem from "./BannerItem";
import {fetchBannersAction, selectBannerList, selectBannerLoading, selectBannersLoaded} from "./index";
import "./banner.scss";

const BannerCarousel: React.FC = () => {
    const dispatch = useDispatch();
    const carouselRef = useRef<HTMLDivElement>(null);
    const list = useSelector(selectBannerList);
    const loading = useSelector(selectBannerLoading);
    const loaded = useSelector(selectBannersLoaded);

    const [size, setSize] = useState(600);
    const [active, setActive] = useState(0);
    const [intervalHandle, setIntervalHandle] = useState(0);

    const getWidth = (): number => {
        if (carouselRef && carouselRef.current) {
            return carouselRef.current.clientWidth;
        }
        return 300;
    }

    useEffect(() => {
        const resizeListener = () => {
            setSize(getWidth());
        }
        window.addEventListener('resize', resizeListener);
        if (!loaded && !loading) {
            dispatch(fetchBannersAction());
        }
        setSize(getWidth());
        if (list.length > 0) {
            startCarousel();
        }
        return function cleanUp() {
            window.clearInterval(intervalHandle);
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        if (list.length > 0) {
            startCarousel();
        }
        return function cleanUp() {
            window.clearInterval(intervalHandle);
        }
    }, [list.length]);

    const rotateCarousel = () => {
        setActive(active => (active + 1) % list.length);
    }
    const startCarousel = () => {
        window.clearInterval(intervalHandle);
        setActive(0);
        if (list.length > 0) {
            const timer = window.setInterval(rotateCarousel, 5000);
            setIntervalHandle(timer);
        }
    }

    const stopCarousel = () => {
        console.log('stopCarousel()');
        window.clearInterval(intervalHandle);
    }
    const onClickIndicator = (index: number) => {
        stopCarousel();
        setActive(index);
        // startCarousel();
    }


    const maxHeight = `${size}px`;
    const height = `${size}px`;

    return (
        <div className="carousel slide tc__banner-carousel">
            <div className="carousel-indicators">
                {list.map((banner, index) => (
                    <BannerIndicator key={banner.id} active={index === active} onClick={() => onClickIndicator(index)}/>)
                )}
            </div>
            <div className="carousel-inner" style={{maxHeight, height}} ref={carouselRef} onMouseOver={stopCarousel}
                 onMouseOut={startCarousel}>
                {list.map((banner, index) => (
                    <BannerItem key={banner.id} banner={banner} active={index === active}/>
                ))}
            </div>
        </div>
    )
}

export default BannerCarousel;
