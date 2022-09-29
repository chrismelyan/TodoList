import axios from 'axios'

// TYPES
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
export type FieldsErrorType = {field: string, error: string}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldsErrorType>
    data: D
}
type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '344e1d93-75ad-4579-8284-aae71a3ea37e'
    }
})

// api
export const todolistsAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<UpdateTaskType, ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{userId: number}>>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType<{}>>('auth/login');
    },
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('/auth/me');
    }
}
