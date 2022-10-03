import {asyncActions, slice, TasksStateType} from './tasks-reducer';
import {TaskPriorities, TaskStatuses, TodolistType} from "../../../../api/types";
import {asyncActions as todolistAsyncActions} from '../todolist-reducer';

const {reducer: tasksReducer} = slice
const {addTask, removeTask, updateTask } = asyncActions
const {addTodolist, removeTodolist} = todolistAsyncActions

let startState: TasksStateType = {}
beforeEach(() => {
        startState = {
            "todolistId1": [
                {
                    description: '', title: 'CSS', status: TaskStatuses.New,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '1', todoListId: 'todolistId1',
                    order: 0, addedDate: ''
                },
                {
                    description: '', title: 'JS', status: TaskStatuses.InProgress,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '2', todoListId: 'todolistId1',
                    order: 0, addedDate: ''
                },
                {
                    description: '', title: 'React',status: TaskStatuses.New,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '3', todoListId: 'todolistId1',
                    order: 0, addedDate: ''
                },
            ],
            "todolistId2": [
                {
                    description: '', title: 'bread', status: TaskStatuses.New,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '1', todoListId: 'todolistId2',
                    order: 0, addedDate: ''
                },
                {
                    description: '', title: 'milk', status: TaskStatuses.InProgress,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '2', todoListId: 'todolistId2',
                    order: 0, addedDate: ''
                },
                {
                    description: '', title: 'corn', status: TaskStatuses.InProgress,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '3', todoListId: 'todolistId2',
                    order: 0, addedDate: ''
                },
            ]
        }
    }
)

test('correct task should be deleted from correct array', () => {
    const params = {taskId: "2", todolistId: "todolistId2"}
    const action = removeTask.fulfilled(params, 'requiredID', params);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();

});

test('correct task should be added to correct array', () => {
    let task = {
        description: '',
        title: 'juice',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        id: '4',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: ''
    }

    const action = addTask.fulfilled(task, 'requestId', {todolistId: task.todoListId, title: task.title});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
});

test('status of specified task should be changed', () => {
    const param = {
        todolistId: "todolistId2",
        taskId: "2",
        model: {status: TaskStatuses.InProgress}
    }
    const action = updateTask.fulfilled(param, 'requestId', param);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.InProgress);
    expect(endState["todolistId2"][2].status).toBe(TaskStatuses.InProgress);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.InProgress);
});

test('new array should be added when new todolist is added', () => {
    const todolist: TodolistType = {
        id: 'todolistId3',
        title: 'new todolist',
        order: 0,
        addedDate: '',
    }
    const action = addTodolist.fulfilled({todolist}, 'requestedId', todolist.title);

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('title of specified task should be changed', () => {
    const param = {
        todolistId: "todolistId2",
        taskId: "2",
        model: {title: 'chicken'}
    }
    const action = updateTask.fulfilled(param, 'requestedId', param);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("chicken");
    expect(endState["todolistId2"][2].title).toBe("corn");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolist.fulfilled({id: "todolistId2"}, 'requestedId', 'todolistId2');

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});



