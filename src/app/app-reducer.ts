import {authAPI} from "../api/todolists-api";
import {ResultCodeStatuses} from "../features/todolist-list/tasks-reducer";
import {setIsLoggedInAC} from "../components/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatusAC (state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setErrorAC (state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setIsInitializedAC (state, action: PayloadAction<{initialized: boolean}>) {
            state.isInitialized = action.payload.initialized
        }
    }
})
export const appReducer = slice.reducer
export const {setStatusAC, setErrorAC, setIsInitializedAC} = slice.actions

// THUNK CREATOR
export const initializedAppTC = () =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        authAPI.me().then(res => {
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
            .finally(() => {
                dispatch(setIsInitializedAC({initialized: true}))
            })
    }
