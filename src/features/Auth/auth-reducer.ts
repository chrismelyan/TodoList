import {authAPI} from "../../api/todolists-api";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/error-utils";
import {ResultCodeStatuses} from "../TodolistList/tasks-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearDataAC} from "../TodolistList/todolist-reducer";
import {FieldsErrorType, LoginParamsType} from "../../api/types";
import {appActions} from "../CommonActions/App";

const {setAppStatus} = appActions

export const login = createAsyncThunk<undefined, LoginParamsType,
    { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorType> }
    }>('auth/login', async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await authAPI.login(param)
            if (res.data.resultCode === ResultCodeStatuses.success) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
                return
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI);
            }
        } catch (err: any) {
            return handleAsyncServerNetworkError(err, thunkAPI);
        }
    })

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCodeStatuses.success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(clearDataAC());
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI);
    }
})

export const asyncActions = {
    login,
    logout
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})
