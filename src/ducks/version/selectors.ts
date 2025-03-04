import {RootState} from "../../app/configureStore";

export const selectVersion = (state: RootState): string => state.version.current;
export const selectUpdateAvailable = (state: RootState): boolean => !!state.version.current && state.version.available > state.version.current;
export const selectVersionLoading = (state: RootState): boolean => state.version.loading;
