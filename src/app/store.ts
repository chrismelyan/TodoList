import {combineReducers} from "redux";
import thunk from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/Auth";
import {appReducer} from "../features/App";
import {tasksReducer, todolistReducer} from "../features/TodolistList";

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

// useAppSelector - hook/container with already an applied type of the whole app. No need app type in useSelector now.
// export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector

//@ts-ignore
window.store = store