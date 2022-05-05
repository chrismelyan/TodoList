import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";


export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppRootStoreType = ReturnType<typeof rootReducer>