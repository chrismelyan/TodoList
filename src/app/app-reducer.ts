import {AppThunkType} from "./store";
import {authAPI} from "../api/todolists-api";
import {ResultCodeStatuses} from "../features/todolist-list/tasks-reducer";
import {setIsLoggedInAC} from "../components/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
}
export type InitialStateType = typeof initialState

export type AppReducerType = ReturnType<typeof setErrorAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setIsInitializedAC>

export const appReducer = (state: InitialStateType = initialState, action: AppReducerType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.initialized}
        default:
            return state
    }
}
// ACTION CREATORS
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitializedAC = (initialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', initialized} as const)

// THUNK CREATOR
export const initializedAppTC = (): AppThunkType =>
    (dispatch) => {
        dispatch(setStatusAC('loading'))
        authAPI.me().then(res => {
            if (res.data.resultCode === ResultCodeStatuses.success) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
            .finally(() => {
                dispatch(setIsInitializedAC(true))
            })
    }
