import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    console.log(v1())
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')


    // let tasks_2: Array<TaskType> = [
    //     {id: 1, title: "Head First", isDone: true},
    //     {id: 2, title: "JS for kids", isDone: true},
    //     {id: 3, title: "Algorithms", isDone: false},
    //     {id: 4, title: "War and Peace", isDone: false},
    // ]

    // const tasks_3: Array<TaskType> = [
    //     {id: 1, title: "Movies", isDone: true},
    //     {id: 2, title: "Books", isDone: false},
    //     {id: 3, title: "Gym", isDone: true},
    //     {id: 4, title: "Hiking", isDone: false},
    // ]
    //
    // const tasks_4: Array<TaskType> = [
    //     {id: 1, title: "Milk", isDone: false},
    //     {id: 2, title: "Bread", isDone: true},
    //     {id: 3, title: "Chicken", isDone: false},
    //     {id: 4, title: "Vegetables", isDone: true},
    // ]


    //Удаляем таску, отфильтровываем массив обьектов и создаем новый массив уже без удаленного
    const removeTask = (taskID: string) => { // 2
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        // => true (filter засовывает в массив обьекты если значение true)
        setTasks(filteredTasks);
    }
    // Добавление нового таска в массив
    const addTask = (title: string) => {
        // копируем массив тасков и добавляем первым в него новый обьект
        // const newTask: TaskType = {
        //     id: v1(), title: title, isDone: false
        // }
        // const updatedTasks = [newTask, ...tasks]
        // setTasks(updatedTasks)
        setTasks([{
            id: v1(), title, isDone: false
        }, ...tasks])
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilteredTasksForRender = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={getFilteredTasksForRender()}
                changeFilter={changeFilter}
                removeTask={removeTask}
                addTask={addTask}
                filter={filter}
            />
            {/*<TodoList title={'Must read'} tasks={tasks_2} removeTask={removeTask}/>*/}
            {/*<TodoList title={'Free time activities'} tasks={tasks_3}/>*/}
            {/*<TodoList title={'What to buy'} tasks={tasks_4}/>*/}
        </div>
    );
}

export default App;
