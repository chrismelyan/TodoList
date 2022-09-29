import {setStatusAC} from "../../app/app-reducer";
import {authAPI, FieldsErrorType, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {ResultCodeStatuses} from "../../features/todolist-list/tasks-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {clearDataAC} from "../../features/todolist-list/todolist-reducer";

// export const loginTC = (data: LoginParamsType) =>
//     (dispatch: Dispatch) => {
//
//     }

export const loginTC = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldsErrorType> }
}>(
    'auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: 'loading'}))
        try {
            const res = await authAPI.login(param)
                    if (res.data.resultCode === ResultCodeStatuses.success) {
                        thunkAPI.dispatch(setStatusAC({status: 'succeeded'}));
                        return {isLoggedIn: true};
                    } else {
                        handleServerAppError(thunkAPI.dispatch, res.data)
                        return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
                    }
        } catch (err: any) {
        const error: AxiosError = err
                handleServerNetworkError(thunkAPI.dispatch, err.message);
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined});
            }})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{isLoggedIn: boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})
export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions


// THUNK CREATORS
export const logoutTC = () =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    dispatch(setIsLoggedInAC({isLoggedIn: false}));
                    dispatch(setStatusAC({status: 'succeeded'}));
                    dispatch(clearDataAC());
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }