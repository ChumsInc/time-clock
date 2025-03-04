import {RootState} from "../../app/configureStore";

export const selectBannerList = (state: RootState) => state.banners.list;
export const selectBannerLoading = (state: RootState) => state.banners.loading;
export const selectBannersLoaded = (state:RootState) => state.banners.loaded;
