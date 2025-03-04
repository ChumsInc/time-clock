import {fetchJSON} from "@chumsinc/ui-utils";
import {BannerImage} from "@/src/types";
import {API_PATH_BANNERS} from "@/src/constants";

export async function fetchBanners():Promise<BannerImage[]> {
    try {
        const url = '/api/timeclock/images/active';
        const res = await fetchJSON<{banners: BannerImage[]}>(url);
        return res?.banners ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchBanners()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchBanners()", err);
        return Promise.reject(new Error('Error in fetchBanners()'));
    }
}
