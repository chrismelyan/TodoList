import {combineReducers} from "redux";
import {todolistReducer} from "../features/TodolistList/todolist-reducer";
import {tasksReducer} from "../features/TodolistList/tasks-reducer";
import thunk from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/Auth";
import {appReducer} from "../features/App";

export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})
export type AppRootStoreType = ReturnType<typeof rootReducer>

// useAppSelector - hook/container with already an applied type of the whole app. No need app type in useSelector now.
// export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector

export type AppDispatchType = typeof store.dispatch

//@ts-ignore
window.store = store