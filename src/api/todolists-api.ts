import axios from 'axios'

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
type TodolistResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
type TasksResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '73ec80e8-a879-4389-884b-c8ca6798760f'
    }
})

export const todolistsAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<TodolistResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<TodolistResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<TasksResponseType<{items: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<TasksResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {model})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TasksResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
