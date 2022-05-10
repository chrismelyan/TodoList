import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunkType} from "./store";

export type TodolistActionType = ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all'}, ...state];
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

// ACTION CREATORS
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const removeTodolistAC = (todolistID: string) => ({type: "REMOVE-TODOLIST", id: todolistID} as const)
export const changeTodolistTitleAC = (todolistID: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", todolistID, title} as const}
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return {type: "CHANGE-FILTER", todolistID, value} as const}
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)

// THUNK CREATORS
export const getTodolistsTC = (): AppThunkType => async dispatch => {
    const data = await todolistsAPI.getTodolist()
    dispatch(setTodolistsAC(data.data))
}
export const addTodolistTC = (title: string): AppThunkType => async dispatch => {
    const res = await todolistsAPI.createTodolist(title)
        const newTodo = res.data.data.item
        dispatch(addTodolistAC(newTodo))
}