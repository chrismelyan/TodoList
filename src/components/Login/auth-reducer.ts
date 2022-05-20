import {AppThunkType} from "../../app/store";
import {AppReducerType, setStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {ResultCodeStatuses} from "../../features/todolist-list/tasks-reducer";

type InitialStateType = typeof initialState
export type AuthActionType = ReturnType<typeof setIsLoggedInAC> | AppReducerType

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch(action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// ACTON CREATORS
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// THUNK CREATORS
export const loginTC = (data: LoginParamsType): AppThunkType =>
    (dispatch) => {
    dispatch(setStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
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
}
export const logoutTC = (): AppThunkType =>
    (dispatch) => {
        dispatch(setStatusAC('loading'))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    dispatch(setIsLoggedInAC(false));
                    dispatch(setStatusAC('succeeded'));
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }