import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: true},
        {id: 4, title: "TS", isDone: false},
    ]

    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Head First", isDone: true},
        {id: 2, title: "JS for kids", isDone: true},
        {id: 3, title: "Algorithms", isDone: false},
        {id: 4, title: "War and Peace", isDone: false},
    ]

    const tasks_3: Array<TaskType> = [
        {id: 1, title: "Movies", isDone: true},
        {id: 2, title: "Books", isDone: false},
        {id: 3, title: "Gym", isDone: true},
        {id: 4, title: "Hiking", isDone: false},
    ]

    const tasks_4: Array<TaskType> = [
        {id: 1, title: "Milk", isDone: false},
        {id: 2, title: "Bread", isDone: true},
        {id: 3, title: "Chicken", isDone: false},
        {id: 4, title: "Vegetables", isDone: true},
    ]

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks_1}/>
            <TodoList title={'Must read'} tasks={tasks_2}/>
            <TodoList title={'Free time activities'} tasks={tasks_3}/>
            <TodoList title={'What to buy'} tasks={tasks_4}/>
        </div>
    );
}

export default App;
