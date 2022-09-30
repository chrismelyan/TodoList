import {todolistsAPI} from "../../api/todolists-api";
import {AppRootStoreType} from "../../app/store";
import {setStatusAC} from "../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addTodolistAC, clearDataAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";
import {TaskStatuses, TaskType, UpdateTaskType} from "../../api/types";

export enum ResultCodeStatuses {
    success = 0,
    error = 1,
    captcha = 10
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

export const updateTaskTC = createAsyncThunk('task/changeTaskStatus', async (param: {todolistId: string, taskId: string, model: UpdateDomainTaskModelType}, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStoreType;
    const currentTask = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!currentTask) {
        return thunkAPI.rejectWithValue('task is not found')
    }
    const apiModel: UpdateTaskType = {
        ...currentTask
    }

    try {
        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
               return param
    } catch (err: any) {
            handleServerNetworkError(thunkAPI.dispatch, err.message)
        return thunkAPI.rejectWithValue(null)
        }
})
export const addTaskTC = createAsyncThunk('task/addTask', async (param: { todolistId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title);
        if (res.data.resultCode === ResultCodeStatuses.success) {
            dispatch(setStatusAC({status: 'succeeded'}));
            return res.data.data.item;
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (err: any) {
        handleServerNetworkError(dispatch, err.message)
        return rejectWithValue(null)
    }
})
export const removeTaskTC = createAsyncThunk('task/removeTask', async (param: { taskId: string, todolistId: string }, {dispatch}) => {
    dispatch(setStatusAC({status: 'loading'}))
    await todolistsAPI.deleteTask(param.todolistId, param.taskId);
    dispatch(setStatusAC({status: 'succeeded'}))
    return {taskId: param.taskId, todolistId: param.todolistId}
    // .catch(err => {
    //     handleServerNetworkError(dispatch, err.message)
    // })
})
export const getTasksTC = createAsyncThunk('tasks/getTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: 'loading'}))
    // try {
    const res = await todolistsAPI.getTasks(todolistId);
    thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
    return {tasks: res.data.items, todolistId: todolistId}
    // } catch (err: any) {
    //     return handleServerNetworkError(thunkAPI.dispatch, err.message)
    // }
})

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistID];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(t => state[t.id] = [])
        });
        builder.addCase(clearDataAC, (state, action) => {
            return {}
        });
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            // {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)};
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(el => el.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload);
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(el => el.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        });
    }
})

export const tasksReducer = slice.reducer;

type UpdateDomainTaskModelType = {
    status: TaskStatuses
    title: string
}