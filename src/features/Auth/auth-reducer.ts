import {authAPI} from "../../api/todolists-api";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginParamsType, ResultCodeStatuses} from "../../api/types";
import {appActions} from "../CommonActions/App";
import {ThunkError} from "../../utils/types";
import {todolistActions} from "../TodolistList";

const {setAppStatus} = appActions

export const login = createAsyncThunk<undefined, LoginParamsType, ThunkError>('auth/login', async (param, thunkAPI) => {
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

const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCodeStatuses.success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            thunkAPI.dispatch(todolistActions.clearDataAC());
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
