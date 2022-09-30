import {AppRootStoreType} from "../../app/store";

export const selectTodolists = (state: AppRootStoreType) => state.todolists
export const selectTasks = (state: AppRootStoreType) => state.tasks
