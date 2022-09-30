import * as todolistSelectors from './selectors';
import {asyncActions as asyncTodolistActions, slice as todolistSlice} from "./todolist/todolist-reducer";
import {asyncActions as asyncTaskActions, slice as taskSlice} from './todolist/task/tasks-reducer';
import TodolistsList from './TodolistsList';

const todolistReducer = todolistSlice.reducer;
const tasksReducer = taskSlice.reducer;

const todolistActions = {
    ...todolistSlice.actions,
    ...asyncTodolistActions,
};
const tasksActions = {
    ...taskSlice.actions,
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