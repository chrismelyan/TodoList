import {combineReducers} from "redux";
import {todolistReducer} from "../features/todolist-list/todolist-reducer";
import {tasksReducer} from "../features/todolist-list/tasks-reducer";
import thunk from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../components/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


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
export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector

//@ts-ignore
window.store = store