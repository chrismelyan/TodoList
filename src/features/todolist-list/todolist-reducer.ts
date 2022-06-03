import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setStatusAC} from "../../app/app-reducer";
import {ResultCodeStatuses} from "./tasks-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        removeTodolistAC(state, action: PayloadAction<{todolistID: string}>) {
            // state.filter(el => el.id !== action.payload.todolistID);
            const index = state.findIndex(el => el.id === action.payload.todolistID);
            if (index > -1) {
                state.splice(index, 1);
            }
        },
        changeTodolistTitleAC(state, action: PayloadAction<{todolistID: string, title: string}>) {
            // state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.title} : el);
            const index = state.findIndex(el => el.id === action.payload.todolistID);
            state[index].title = action.payload.title;
        },
        changeFilterAC(state, action: PayloadAction<{todolistID: string, value: FilterValuesType}>) {
            // state.map(el => el.id === action.payload.todolistID ? {...el, filter: action.payload.value} : el);
            const index = state.findIndex(el => el.id === action.payload.todolistID);
            state[index].filter= action.payload.value;
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodolistType>}>) {
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{todolistID: string, status: RequestStatusType}>) {
            // state.map(el => el.id === action.payload.todolistId ? {...el, entityStatus: action.payload.status} : el);
            const index = state.findIndex(el => el.id === action.payload.todolistID);
            state[index].entityStatus = action.payload.status;
        }
    }
})

export const todolistReducer = slice.reducer;
export const {addTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC,
    changeTodolistTitleAC,
    changeFilterAC} = slice.actions;

// THUNK CREATORS
export const getTodolistsTC = () =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        todolistsAPI.getTodolist()
            .then(data => {
                dispatch(setTodolistsAC({todolists: data.data}))
                dispatch(setStatusAC({status: 'succeeded'}))
            })
            .catch(err => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
export const addTodolistTC = (title: string) =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                    dispatch(setStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
export const deleteTodolistTC = (todolistId: string) =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({todolistID: todolistId, status: 'loading'}))
        todolistsAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC({todolistID: todolistId}))
                dispatch(setStatusAC({status: 'succeeded'}))
            })
            .catch(err => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
export const changeTodolistTitleTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(() => {
                dispatch(changeTodolistTitleAC({todolistID: todolistId, title: title}))
            })
            .catch(err => {
                handleServerNetworkError(dispatch, err.message)
            })
    }