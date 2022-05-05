import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

export type ActionType = ReturnType<typeof addTodolist>
    | ReturnType<typeof removeTodolist>
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeFilter>
    | ReturnType<typeof setTodolists>

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
            }, ...state];
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id);
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todolistID ? {...el, title: action.title} : el);
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.todolistID ? {...el, filter: action.value} : el);
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: 'all'}))
        default:
            return state;
    }
}

export const addTodolist = (title: string) => ({type: "ADD-TODOLIST", title: title, todolistID: v1()} as const)
export const removeTodolist = (todolistID: string) => ({type: "REMOVE-TODOLIST", id: todolistID} as const)
export const changeTodolistTitle = (todolistID: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", todolistID, title} as const}
export const changeFilter = (todolistID: string, value: FilterValuesType) => {
    return {type: "CHANGE-FILTER", todolistID, value} as const}
export const setTodolists = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)