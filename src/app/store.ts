import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistActionType, todolistReducer} from "../features/todolist-list/todolist-reducer";
import {TasksActionsType, tasksReducer} from "../features/todolist-list/tasks-reducer";
import {ThunkAction} from "redux-thunk";
import thunk from 'redux-thunk'
import {appReducer, AppReducerType} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";


export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof rootReducer>
export type AppActionType = TodolistActionType | TasksActionsType | AppReducerType

// useAppSelector - hook/container with already an applied type of the whole app. No need app type in useSelector now.
export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStoreType, unknown, AppActionType>