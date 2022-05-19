import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {AppThunkType} from "../../app/store";
import {AppReducerType, RequestStatusType, setStatusAC} from "../../app/app-reducer";
import {ResultCodeStatuses} from "./tasks-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type TodolistActionType = ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | AppReducerType

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state];
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id);
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todolistID ? {...el, title: action.title} : el);
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.todolistID ? {...el, filter: action.value} : el);
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case "CHANGE-ENTITY-STATUS":
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        default:
            return state;
    }
}

// ACTION CREATORS
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const removeTodolistAC = (todolistID: string) => ({type: "REMOVE-TODOLIST", id: todolistID} as const)
export const changeTodolistTitleAC = (todolistID: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", todolistID, title} as const
}
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return {type: "CHANGE-FILTER", todolistID, value} as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
    return {type: "CHANGE-ENTITY-STATUS", todolistId, status} as const
}

// THUNK CREATORS
export const getTodolistsTC = (): AppThunkType =>
    (dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTodolist()
            .then(data => {
                dispatch(setTodolistsAC(data.data))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(err => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
export const addTodolistTC = (title: string): AppThunkType =>
    (dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
export const deleteTodolistTC = (todolistId: string): AppThunkType =>
    (dispatch) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(err => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType =>
    (dispatch) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
            .catch(err => {
                handleServerNetworkError(dispatch, err.message)
            })
    }