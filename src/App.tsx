import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const [todolist, setTodolist] = useState<TodolistType[]>([
        {id: todolistID_1, title: "What to learn", filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "TS", isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Coke", isDone: true},
            {id: v1(), title: "Meat", isDone: false}
        ],
    })

    //Удаляем таску, отфильтровываем массив обьектов и создаем новый массив уже без удаленного
    const removeTask = (todolistID: string, taskID: string) => {
        // => true (filter засовывает в массив обьекты если значение true)
        setTasks({...tasks, [todolistID] : tasks[todolistID].filter(el => el.id !== taskID)});
    }
    // Добавление нового таска в массив
    const addTask = (todolistID: string, title: string) => {
        // копируем массив тасков и добавляем первым в него новый обьект
        const task = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistID] : [task, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID] : tasks[todolistID].map(el => el.id === taskID ? {...el, isDone} : el)})
    }

    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        let todoList = todolist.find(tl => tl.id === todolistID);
        if (todoList) {
            todoList.filter = value;
            setTodolist([...todolist])
        }
    }


    return (
        <div className="App">
            {
                todolist.map(el => {
                    let allTodolistTasks = tasks[el.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (el.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }

                    return <TodoList
                        key={el.id}
                        title={el.title}
                        todolistID={el.id}
                        tasks={tasksForTodolist}
                        changeFilter={changeFilter}
                        removeTask={removeTask}
                        addTask={addTask}
                        filter={el.filter}
                        changeTaskStatus={changeTaskStatus}
                    />
                })}
        </div>
    );
}

export default App;
