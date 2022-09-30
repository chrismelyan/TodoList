import {AppRootStoreType} from "../../app/store";

export const selectStatus = (state: AppRootStoreType) => state.app.status
export const selectIsInitialized = (state: AppRootStoreType) => state.app.isInitialized