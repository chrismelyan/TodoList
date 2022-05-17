import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolist-reducer";
import {TaskStatuses, TaskType, todolistsAPI} from "../../api/todolists-api";
import {AppRootStoreType, AppThunkType} from "../../app/store";
import {AppReducerType, setStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export enum ResultCodeStatuses {
    success = 0,
    error = 1,
    captcha = 10
}

export type TasksActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof removeTodolistAC>
    | AppReducerType;

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            const copy = {...state}
            action.todolists.forEach(tl => copy[tl.id] = [])
            return copy
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks};
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)};
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]:
                    state[action.todolistID].map(t => t.id === action.taskID ? {...t, status: action.status} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]:
                    state[action.todolistID].map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            }
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
}
// ACTION CREATORS
export const removeTaskAC = (taskID: string, todolistID: string) => ({type: 'REMOVE-TASK', taskID, todolistID} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todolistID, taskID, status} as const
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID} as const
}
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {type: "SET-TASKS", tasks, todolistId} as const
}

// THUNK CREATORS
export const getTasksTC = (todolistId: string): AppThunkType => async dispatch => {
    dispatch(setStatusAC('loading'))
    const res = await todolistsAPI.getTasks(todolistId)
    dispatch(setTasksAC(res.data.items, todolistId))
    dispatch(setStatusAC('succeeded'))
}
export const removeTaskTC = (taskId: string, todolistId: string): AppThunkType => async dispatch => {
    dispatch(setStatusAC('loading'))
    await todolistsAPI.deleteTask(todolistId, taskId)
    dispatch(removeTaskAC(taskId, todolistId))
    dispatch(setStatusAC('succeeded'))
}
export const addTaskTC = (todolistId: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
        if (res.data.resultCode === ResultCodeStatuses.success) {
            dispatch(addTaskAC(res.data.data.item));
            dispatch(setStatusAC('succeeded'));
        } else {
            handleServerAppError(dispatch, res.data)
        }
    })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses): AppThunkType =>
    async (dispatch,
           getState: () => AppRootStoreType) => {
        const allAppTasks = getState().tasks
        const tasksForCurrentTodo = allAppTasks[todolistId]
        const currentTask = tasksForCurrentTodo.find(t => t.id === taskId)
        const model: any = {...currentTask, status}
        await todolistsAPI.updateTask(todolistId, taskId, model)
        dispatch(changeTaskStatusAC(todolistId, taskId, status))
    }