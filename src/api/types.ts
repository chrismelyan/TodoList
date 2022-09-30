export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
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
export enum ResultCodeStatuses {
    success = 0,
    error = 1,
    captcha = 10
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
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
export type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}