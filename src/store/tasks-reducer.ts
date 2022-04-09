import {TasksStateType} from '../App';
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todolistID: string
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ReturnType<typeof addTodolistAC>
    | ChangeTaskTitleActionType
    | ReturnType<typeof removeTodolistAC>;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistID]: [
                    ...state[action.todolistID],
                    {id: v1(), title: action.title, isDone: false}
                ]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistID]:
                    state[action.todolistID].map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistID]: []
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistID]:
                    state[action.todolistID].map(t => t.id === action.taskID ? {...t, title: action.title} : t)
            }
        }
        case 'REMOVE-TODOLIST': {
            // const {[action.id]: [], ...rest} = {...state}
            // return rest
            let newState = {...state}
            delete newState[action.id]
            return newState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todolistID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID}
}

