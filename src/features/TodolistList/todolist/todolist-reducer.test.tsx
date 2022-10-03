import {TodolistDomainType, FilterValuesType, slice, asyncActions, changeFilterAC} from './todolist-reducer';
import {v1} from 'uuid';

const todolistReducer = slice.reducer
const {addTodolist, removeTodolist, changeTodolistTitle} = asyncActions

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
    const endState = todolistReducer(startState, removeTodolist.fulfilled({id: todolistId1}, 'requestId', todolistId1))

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

    const endState = todolistReducer(startState, addTodolist.fulfilled({todolist: newTodolist}, 'requestId', newTodolist.title))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolist.title);
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    const action = changeTodolistTitle.fulfilled({
            id: todolistId2, title: 'Where to go'},
        'requestId',
        {todolistId: todolistId2, title: 'Where to go'
        });

    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("Where to go");
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeFilterAC({todolistId: todolistId2, value: newFilter});

    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


