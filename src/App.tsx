import React, {useCallback} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import InputForm from "./InputForm";
import TodoListHeader from "./TodoListHeader";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "./store/store";
import {addTodolistAC} from "./store/todolist-reducer";

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
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStoreType, TodolistType[]>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
       dispatch(addTodolistAC(title))
    },[dispatch])


    return (
        <div className="App">
            <div>
                <TodoListHeader title={'Your next To-do List'}/>
                <InputForm callbackAddValue={addTodolist}/>
            </div>
            {
                todolists.map(el => {

                    return <TodoList
                        key={el.id}
                        todolist={el}
                    />
                })}
        </div>
    );
}

export default App;
