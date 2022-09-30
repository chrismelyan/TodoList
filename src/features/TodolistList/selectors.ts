import {AppRootStoreType} from "../../utils/types";

export const selectTodolists = (state: AppRootStoreType) => state.todolists
export const selectTasks = (state: AppRootStoreType) => state.tasks
