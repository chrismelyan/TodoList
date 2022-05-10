import {combineReducers, createStore} from "redux";
import {TodolistActionType, todolistReducer} from "./todolist-reducer";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import {ThunkAction} from "redux-thunk";


export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppRootStoreType = ReturnType<typeof rootReducer>
export type AppActionType = TodolistActionType | TasksActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStoreType, unknown, AppActionType>