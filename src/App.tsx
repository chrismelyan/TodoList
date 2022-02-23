import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')


    //Удаляем таску, отфильтровываем массив обьектов и создаем новый массив уже без удаленного
    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        // => true (filter засовывает в массив обьекты если значение true)
        setTasks(filteredTasks);
    }
    // Добавление нового таска в массив
    const addTask = (title: string) => {
        // копируем массив тасков и добавляем первым в него новый обьект

        // const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const updatedTasks = [newTask, ...tasks]
        // setTasks(updatedTasks)
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: !t.isDone} : t))
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
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
