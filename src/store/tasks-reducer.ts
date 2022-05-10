import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {AppRootStoreType, AppThunkType} from "./store";

export type TasksActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTodolistAC>;

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {...state, [action.todolistId]:action.tasks};
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)};
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [...state[action.task.todoListId], action.task]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]:
                    state[action.todolistID].map(t => t.id === action.taskID ? {...t, status: action.status} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'CHANGE-TASK-TITLE':
            return {...state,
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
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistID: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskID, status, todolistID} as const}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID} as const}
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {type: "SET-TASKS", tasks, todolistId} as const
}

// THUNK CREATORS
export const getTasksTC = (todolistId: string): AppThunkType => async dispatch => {
    const res = await todolistsAPI.getTasks(todolistId)
            dispatch(setTasksAC(res.data.items, todolistId))
}
export const removeTaskTC = (taskId: string, todolistId: string): AppThunkType => async dispatch => {
    const res = await todolistsAPI.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(taskId, todolistId))
}
export const addTaskTC = (title: string, todolistId: string): AppThunkType => async dispatch => {
    const res = await todolistsAPI.createTask(todolistId, title)
        const newTask = res.data.data.items
        dispatch(addTaskAC(newTask))
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses): AppThunkType =>
    async (dispatch,
           getState: () => AppRootStoreType) => {
        const state = getState()
        const allAppTasks = state.tasks
        const tasksForCurrentTodo = allAppTasks[todolistId]
        const currentTask = tasksForCurrentTodo.find(t => {
            return t.id === taskId
        })
        const model: any = {...currentTask, status}
        await todolistsAPI.updateTask(todolistId, taskId, model)
            dispatch(changeTaskStatusAC(taskId, status, todolistId))
    }