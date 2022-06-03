import {setErrorAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setErrorAC({error: message}));
    dispatch(setStatusAC({status: 'failed'}));
}

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    dispatch(setErrorAC(data.messages.length ? {error: data.messages[0]} : {error: 'some error'}));
    dispatch(setStatusAC({status: 'failed'}));
}