import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BannerIndicator from "./BannerIndicator";
import BannerItem from "./BannerItem";
import {fetchBannersAction, selectBannerList, selectBannerLoading, selectBannersLoaded} from "./index";
import "./banner.scss";

let timer:number = 0;

const BannerCarousel: React.FC = () => {
    const dispatch = useDispatch();
    const carouselRef = useRef<HTMLDivElement>(null);

    const getWidth = (): number => {
        if (carouselRef && carouselRef.current) {
            return carouselRef.current.clientWidth;
        }
        return 300;
    }
    const list = useSelector(selectBannerList);
    const loading = useSelector(selectBannerLoading);
    const loaded = useSelector(selectBannersLoaded);

    const [size, setSize] = useState(600);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const resizeListener = () => {
            setSize(getWidth());
        }
        window.addEventListener('resize', resizeListener);
        if (!loaded && !loading) {
            dispatch(fetchBannersAction());
        }
        setSize(getWidth());

        return function cleanUp() {
            window.clearInterval(timer);
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        console.log(`list.length: ${list.length}`);
        window.clearInterval(timer);
        setActive(0);
        if (list.length === 0) {
            return;
        }
        timer = window.setInterval(rotateCarousel, 3000);
        return function cleanUp() {
            window.clearInterval(timer);
        }
    }, [list.length]);

    const rotateCarousel = () => {
        const nextActive = (active + 1) % list.length;
        setActive(nextActive);
    }
    const startCarousel = () => {
        console.log('startCarousel()')
        timer = window.setInterval(rotateCarousel, 3000);
    }
    const stopCarousel = () => {
        console.log('stopCarousel()');
        window.clearInterval(timer);
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
