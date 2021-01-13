import {API_PATH_BANNERS, FETCH_BANNERS, FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS} from "../constants";
import {fetchGET} from "./fetch";

let bannerTimer = null;

export const fetchBanners = () => (dispatch, getState) => {
    const {banner} = getState();
    if (banner.loading) {
        return;
    }

    clearTimeout(bannerTimer);

    dispatch({type: FETCH_BANNERS, status: FETCH_INIT});
    fetchGET(API_PATH_BANNERS, {cache: 'no-cache'})
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

