import * as todolistSelectors from './selectors';
import {asyncActions as asyncTodolistActions, slice as todolistSlice} from "./todolist/todolist-reducer";
import TodolistsList from './TodolistsList';
import {tasksReducer, taskSliceActions, asyncActions as asyncTaskActions} from './todolist/task/tasks-reducer'

const todolistReducer = todolistSlice.reducer;

const todolistActions = {
    ...todolistSlice.actions,
    ...asyncTodolistActions,
};
const tasksActions = {
    ...taskSliceActions,
    ...asyncTaskActions
}

export {
    todolistSelectors,
    todolistActions,
    todolistReducer,
    TodolistsList,
    tasksReducer,
    tasksActions
}