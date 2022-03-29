import {TodolistType} from "../App";
import {v1} from "uuid";

export type ActionType = ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof updateTodolistAC>

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [...state, {id: v1(), title: action.title, filter: 'all'}];
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id);
        case "UPDATE-TODOLIST":
            return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.title} : el);
        default:
            return state;
    }
}

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title: title
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
