import React from 'react';
import ClockActionPage from "../ducks/user/ClockActionPage";
import BannerCarousel from "../ducks/banners/BannerCarousel";

const ClockPage: React.FC = () => {
    return (
        <div className="row tc__clock-page">
            <div className="tc__clock-page--banner col-md-4">
                <BannerCarousel/>
            </div>
            <div className="tc__clock-page--action col-md-8">
                <ClockActionPage/>
            </div>
        </div>
    );
}

export default ClockPage;
