import {tasksReducer, TasksStateType} from "./task/tasks-reducer";
import {addTodolistAC, TodolistDomainType, todolistReducer} from "./todolist-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
    let newTodolist = {
        title: 'Where to go',
        id: 'todolistId3',
        order: 0,
        addedDate: '',
        filter: 'all',
        entityStatus: 'idle',
    };

    const action = addTodolistAC(newTodolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id);
    expect(idFromTodolists).toBe(action.payload.id);
});
