import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistReducer, TodolistDomainType, FilterValuesType, changeTodolistTitleAC
} from './todolist-reducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC({todolistID: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolist = {
        title: 'Where to go',
        id: 'todolistId3',
        order: 0,
        addedDate: '',
        filter: 'all',
        entityStatus: 'idle',
    };

    const endState = todolistReducer(startState, addTodolistAC(newTodolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolist.title);
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    const action = changeTodolistTitleAC({todolistID: todolistId2, title: 'Where to go'});

    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe('Where to go');
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeFilterAC({todolistID: todolistId2, value: newFilter});

    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


