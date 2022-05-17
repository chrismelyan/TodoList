import {AppReducerType, setErrorAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<AppReducerType>, message: string) => {
    dispatch(setErrorAC(message));
    dispatch(setStatusAC('failed'));
}

export const handleServerAppError = <T>(dispatch: Dispatch<AppReducerType>, data: ResponseType<T>) => {
    dispatch(setErrorAC(data.messages.length ? data.messages[0] : 'some error'));
    dispatch(setStatusAC('failed'));
}