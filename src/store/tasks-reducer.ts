import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>;

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)};
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistID]: [
                    ...state[action.todolistID],
                    {
                        id: v1(),
                        title: action.title,
                        status: TaskStatuses.New,
                        todoListId: action.todolistID,
                        description: '',
                        completed: false,
                        priority: TaskPriorities.Low,
                        startDate: '',
                        deadline: '',
                        order: 0,
                        addedDate: ''
                    }
                ]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistID]:
                    state[action.todolistID].map(t => t.id === action.taskID ? {...t, status: action.status} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistID]: []}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state,
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

export const removeTaskAC = (taskID: string, todolistID: string) => ({type: 'REMOVE-TASK', taskID, todolistID} as const)
export const addTaskAC = (title: string, todolistID: string) => ({type: 'ADD-TASK', title, todolistID} as const)
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistID: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskID, status, todolistID} as const}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID} as const}

