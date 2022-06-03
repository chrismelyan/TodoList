import {setStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {ResultCodeStatuses} from "../../features/todolist-list/tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
})
export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions


// THUNK CREATORS
export const loginTC = (data: LoginParamsType) =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    dispatch(setIsLoggedInAC({value: true}));
                    dispatch(setStatusAC({status: 'succeeded'}));
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
export const logoutTC = () =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    dispatch(setIsLoggedInAC({value: false}));
                    dispatch(setStatusAC({status: 'succeeded'}));
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }