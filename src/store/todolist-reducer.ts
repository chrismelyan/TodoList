import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

export type ActionType = ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof updateTodolistAC>
    | ReturnType<typeof changeFilterAC>

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{
                id: action.todolistID,
                title: action.title,
                filter: 'all',
                order: 0,
                addedDate: ''
            },...state];
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id);
        case "UPDATE-TODOLIST":
            return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.title} : el);
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.payload.todolistID ? {...el, filter: action.payload.value} : el);
        default:
            return state;
    }
}

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistID: v1()
    } as const
}
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        id: todolistID
    } as const
}
export const updateTodolistAC = (todolistID: string, title: string) => {
    return {
        type: "UPDATE-TODOLIST",
        payload: {
            todolistID,
            title
        }
    } as const
}
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            todolistID,
            value
        }
    } as const
}
