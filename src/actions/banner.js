import {FETCH_BANNERS, FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS} from "../constants";
import {fetchGET} from "./fetch";

let bannerTimer = null;

export const fetchBanners = () => (dispatch, getState) => {
    const {banner} = getState();
    if (banner.loading) {
        return;
    }

    clearTimeout(bannerTimer);

    dispatch({type: FETCH_BANNERS, status: FETCH_INIT});
    const url = '/node-dev/timeclock/images/active';
    fetchGET(url)
        .then(res => {
            const list = res.banners || [];
            dispatch({type: FETCH_BANNERS, status: FETCH_SUCCESS, list: list || []});
            bannerTimer = setTimeout(fetchBanners, 60 * 60 * 1000);
        })
        .catch(err => {
            console.log(err, err.message);
            dispatch({type: FETCH_BANNERS, status: FETCH_FAILURE});
        });
}

