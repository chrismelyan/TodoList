import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {AppThunkType} from "../../app/store";
import {RequestStatusType, setStatusAC} from "../../app/app-reducer";

export type TodolistActionType = ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setStatusAC>

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state];
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id);
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todolistID ? {...el, title: action.title} : el);
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.todolistID ? {...el, filter: action.value} : el);
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        default:
            return state;
    }
}

// ACTION CREATORS
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const removeTodolistAC = (todolistID: string) => ({type: "REMOVE-TODOLIST", id: todolistID} as const)
export const changeTodolistTitleAC = (todolistID: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", todolistID, title} as const
}
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return {type: "CHANGE-FILTER", todolistID, value} as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)

// THUNK CREATORS
export const getTodolistsTC = (): AppThunkType => async dispatch => {
    dispatch(setStatusAC('loading'))
    const data = await todolistsAPI.getTodolist()
    dispatch(setTodolistsAC(data.data))
    dispatch(setStatusAC('succeeded'))
}
export const addTodolistTC = (title: string): AppThunkType => async dispatch => {
    dispatch(setStatusAC('loading'))
    const res = await todolistsAPI.createTodolist(title)
    const newTodo = res.data.data.item
    dispatch(addTodolistAC(newTodo))
    dispatch(setStatusAC('succeeded'))
}
export const deleteTodolistTC = (todolistId: string): AppThunkType => async dispatch => {
    await todolistsAPI.deleteTodolist(todolistId)
    dispatch(removeTodolistAC(todolistId))
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType => async dispatch => {
    await todolistsAPI.updateTodolist(todolistId, title)
    dispatch(changeTodolistTitleAC(todolistId, title))
}