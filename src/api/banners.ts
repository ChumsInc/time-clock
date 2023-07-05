import {BannerImage} from "../types";
import {fetchJSON} from "chums-components";
import {API_PATH_BANNERS} from "../constants";

export async function fetchBanners():Promise<BannerImage[]> {
    try {
        const res = await fetchJSON<{banners: BannerImage[]}>(API_PATH_BANNERS);
        return res.banners ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchBanners()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchBanners()", err);
        return Promise.reject(new Error('Error in fetchBanners()'));
    }
}
