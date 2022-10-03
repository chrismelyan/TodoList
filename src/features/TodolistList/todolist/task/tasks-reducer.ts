import {todolistsAPI} from "../../../../api/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ResultCodeStatuses, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType} from "../../../../api/types";
import {appActions} from "../../../CommonActions/App";
import {AppRootStoreType, ThunkError} from "../../../../utils/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../../../utils/error-utils";
import {todolistActions} from "../../index";

const initialState: TasksStateType = {}
const {setAppStatus} = appActions

const getTasks = createAsyncThunk('tasks/getTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(todolistId);
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {tasks: res.data.items, todolistId: todolistId}
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})
const addTask = createAsyncThunk('task/addTask', async (param: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title);
        if (res.data.resultCode === ResultCodeStatuses.success) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
            return res.data.data.item;
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})
const removeTask = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }, ThunkError>('task/removeTask', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        await todolistsAPI.deleteTask(param.todolistId, param.taskId);
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {taskId: param.taskId, todolistId: param.todolistId}
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})
const updateTask = createAsyncThunk('task/changeTaskStatus', async (param: { todolistId: string, taskId: string, model: UpdateDomainTaskModelType }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStoreType;
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task is not found')
    }
    const apiModel: UpdateTaskType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }
    try {
        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === ResultCodeStatuses.success) {
            return param
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})

export const asyncActions = {
    getTasks,
    addTask,
    removeTask,
    updateTask
}

export const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(todolistActions.addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(todolistActions.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(todolistActions.getTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(t => state[t.id] = [])
        });
        builder.addCase(todolistActions.clearDataAC, (state, action) => {
            return {}
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload);
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(el => el.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        });
    }
})

export const tasksReducer = slice.reducer;
export const taskSliceActions = slice.actions;

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}