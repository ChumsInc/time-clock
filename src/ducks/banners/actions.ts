import {createAsyncThunk} from "@reduxjs/toolkit";
import {BannerImage} from "../../types";
import {RootState} from "@/app/configureStore";
import {fetchBanners} from "./api";
import {selectBannersStatus} from "@/ducks/banners/index";

export const loadBanners = createAsyncThunk<BannerImage[]>(
    'banners/load',
    async () => {
        return await fetchBanners();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return selectBannersStatus(state) === 'idle';
        }
    }
)
