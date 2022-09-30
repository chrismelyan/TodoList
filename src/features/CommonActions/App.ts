import {createAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../App/app-reducer";

const setAppStatus = createAction<{status: RequestStatusType}>('app/setAppStatus')
const setAppError = createAction<{error: string | null}>('appAction/setAppError')

export const appActions = {
    setAppError,
    setAppStatus
}