import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistActionType, todolistReducer} from "../features/todolist-list/todolist-reducer";
import {TasksActionsType, tasksReducer} from "../features/todolist-list/tasks-reducer";
import {ThunkAction} from "redux-thunk";
import thunk from 'redux-thunk'


export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStoreType = ReturnType<typeof rootReducer>
export type AppActionType = TodolistActionType | TasksActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStoreType, unknown, AppActionType>