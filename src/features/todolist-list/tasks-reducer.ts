import {TaskStatuses, TaskType, todolistsAPI} from "../../api/todolists-api";
import {AppRootStoreType} from "../../app/store";
import {setStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Dispatch} from "redux";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, clearDataAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";

export enum ResultCodeStatuses {
    success = 0,
    error = 1,
    captcha = 10
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

export const removeTaskTC = createAsyncThunk('task/removeTask', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({status: 'loading'}))
    await todolistsAPI.deleteTask(param.todolistId, param.taskId);
    thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
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
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskID: string, todolistID: string }>) {
            // {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)};
            const tasks = state[action.payload.todolistID];
            const index = tasks.findIndex(el => el.id === action.payload.taskID);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        },
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload);
        },
        changeTaskStatusAC(state, action: PayloadAction<{ todolistID: string, taskID: string, status: TaskStatuses }>) {
            const tasks = state[action.payload.todolistID];
            const index = tasks.findIndex(el => el.id === action.payload.taskID);
            if (index > -1) {
                tasks[index].status = action.payload.status;
            }
        },
        changeTaskTitleAC(state, action: PayloadAction<{ taskID: string, title: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(el => el.id === action.payload.taskID);
            if (index > -1) {
                tasks[index].title = action.payload.title;
            }
        },
    },
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
        })
    }})

export const tasksReducer = slice.reducer;
export const {addTaskAC, changeTaskStatusAC, changeTaskTitleAC} = slice.actions

// THUNK CREATORS
export const addTaskTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === ResultCodeStatuses.success) {
                    dispatch(addTaskAC(res.data.data.item));
                    dispatch(setStatusAC({status: 'succeeded'}));
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch,
     getState: () => AppRootStoreType) => {
        const allAppTasks = getState().tasks
        const tasksForCurrentTodo = allAppTasks[todolistId]
        const currentTask = tasksForCurrentTodo.find(t => t.id === taskId)
        const model: any = {...currentTask, status}
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(() => {
                dispatch(changeTaskStatusAC({todolistID: todolistId, taskID: taskId, status: status}))
            })
            .catch(err => {
                handleServerNetworkError(dispatch, err.message)
            })
    }