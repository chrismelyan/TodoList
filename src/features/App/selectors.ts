import {AppRootStoreType} from "../../utils/types";

export const selectStatus = (state: AppRootStoreType) => state.app.status
export const selectIsInitialized = (state: AppRootStoreType) => state.app.isInitialized
export const selectError = (state: AppRootStoreType) => state.app.error