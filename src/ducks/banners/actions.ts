import {createAsyncThunk} from "@reduxjs/toolkit";
import type {BannerImage} from "chums-types";
import type {RootState} from "@/app/configureStore";
import {fetchBanners} from "@/ducks/banners/api";
import {selectBannersStatus} from "@/ducks/banners/index";

export const loadBanners = createAsyncThunk<BannerImage[], void, { state: RootState }>(
    'banners/load',
    async () => {
        return await fetchBanners();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectBannersStatus(state) === 'idle';
        }
    }
)
