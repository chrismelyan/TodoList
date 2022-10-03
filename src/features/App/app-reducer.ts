import {authAPI} from "../../api/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {authActions} from "../Auth";
import {appActions} from "../CommonActions/App";
import {ResultCodeStatuses} from "../../api/types";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}
const {setIsLoggedIn} = authActions

const initializedApp = createAsyncThunk('app/initializedApp', async (param, thunkAPI) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCodeStatuses.success) {
            thunkAPI.dispatch(setIsLoggedIn({isLoggedIn: true}))
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})

export const asyncActions = {
    initializedApp
}

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(initializedApp.fulfilled, (state) => {
            state.isInitialized = true
        });
        builder.addCase(appActions.setAppError, (state, action) => {
            state.error = action.payload.error
        });
        builder.addCase(appActions.setAppStatus, (state, action) => {
            state.status = action.payload.status
        })
    }
})
