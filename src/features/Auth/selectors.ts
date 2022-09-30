import {AppRootStoreType} from "../../app/store";

export const selectIsLoggedIn = (state: AppRootStoreType) => state.auth.isLoggedIn