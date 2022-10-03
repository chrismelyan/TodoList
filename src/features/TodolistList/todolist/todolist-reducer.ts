import {todolistsAPI} from "../../../api/todolists-api";
import {RequestStatusType} from "../../App/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResultCodeStatuses, TodolistType} from "../../../api/types";
import {appActions} from "../../CommonActions/App";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../../utils/error-utils";
import {ThunkError} from "../../../utils/types";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
const {setAppStatus} = appActions

const getTodolists = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>('todolists/getTodolists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const data = await todolistsAPI.getTodolist()
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todolists: data.data}
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})
const addTodolist = createAsyncThunk<{todolist: TodolistType}, string, ThunkError>
('todolists/addTodolist', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === ResultCodeStatuses.success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI, false)
    }
})
const removeTodolist = createAsyncThunk<{ id: string }, string, ThunkError>('todolists/removeTodolist', async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatus({todolistID: todolistId, status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {id: todolistId}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})
const changeTodolistTitle = createAsyncThunk('todolists/changeTodolistTitle', async (param: { todolistId: string, title: string }, thunkAPI) => {
    try {
        const res = await todolistsAPI.updateTodolist(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {id: param.todolistId, title: param.title}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})

export const asyncActions = {
    getTodolists,
    addTodolist,
    removeTodolist,
    changeTodolistTitle
}

export const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeFilterAC(state, action: PayloadAction<{ todolistId: string, value: FilterValuesType }>) {
            // state.map(el => el.id === action.payload.todolistID ? {...el, filter: action.payload.value} : el);
            const index = state.findIndex(el => el.id === action.payload.todolistId);
            state[index].filter = action.payload.value;
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ todolistID: string, status: RequestStatusType }>) {
            // state.map(el => el.id === action.payload.todolistId ? {...el, entityStatus: action.payload.status} : el);
            const index = state.findIndex(el => el.id === action.payload.todolistID);
            state[index].entityStatus = action.payload.status;
        },
        clearDataAC(state, action: PayloadAction) {
            return []
        }
    },
    extraReducers: builder => {
        builder.addCase(getTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        });
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        });
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            // state.filter(el => el.id !== action.payload.todolistID);
            const index = state.findIndex(el => el.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        });
        builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
            // state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.title} : el);
            const index = state.findIndex(el => el.id === action.payload.id);
            if (index > -1) {
                state[index].title = action.payload.title;
            }
        })
    }
})

export const {changeFilterAC, changeTodolistEntityStatus} = slice.actions
