import {AppRootStoreType} from "../../utils/types";

export const selectIsLoggedIn = (state: AppRootStoreType) => state.auth.isLoggedIn