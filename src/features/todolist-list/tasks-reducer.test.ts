import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer, TasksStateType
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let startState: TasksStateType = {}
beforeEach(() => {
        startState = {
            "todolistId1": [
                {
                    description: '', title: 'CSS', completed: false, status: TaskStatuses.New,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '1', todoListId: 'todolistId1',
                    order: 0, addedDate: ''
                },
                {
                    description: '', title: 'JS', completed: true, status: TaskStatuses.InProgress,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '2', todoListId: 'todolistId1',
                    order: 0, addedDate: ''
                },
                {
                    description: '', title: 'React', completed: true, status: TaskStatuses.New,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '3', todoListId: 'todolistId1',
                    order: 0, addedDate: ''
                },
            ],
            "todolistId2": [
                {
                    description: '', title: 'bread', completed: false, status: TaskStatuses.New,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '1', todoListId: 'todolistId2',
                    order: 0, addedDate: ''
                },
                {
                    description: '', title: 'milk', completed: true, status: TaskStatuses.InProgress,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '2', todoListId: 'todolistId2',
                    order: 0, addedDate: ''
                },
                {
                    description: '', title: 'corn', completed: false, status: TaskStatuses.InProgress,
                    priority: TaskPriorities.Hi, startDate: '', deadline: '', id: '3', todoListId: 'todolistId2',
                    order: 0, addedDate: ''
                },
            ]
        }
    }
)

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({taskID: "2", todolistID: "todolistId2"});

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

    const action = addTaskAC(task);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].completed).toBe(false);
});

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC({
        taskID: "2",
        status: TaskStatuses.InProgress,
        todolistID: "todolistId2"
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.InProgress);
    expect(endState["todolistId2"][2].status).toBe(TaskStatuses.InProgress);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.InProgress);
});

test('new array should be added when new todolist is added', () => {
    const todolist = {
        id: 'todolistId3',
        title: 'new todolist',
        order: 0,
        addedDate: ''
    }
    const action = addTodolistAC(todolist);

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
    const action = changeTaskTitleAC({taskID: "2", title: 'chicken', todolistID: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("chicken");
    expect(endState["todolistId2"][2].title).toBe("corn");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC({todolistID: "todolistId2"});

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});



