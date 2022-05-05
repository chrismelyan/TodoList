import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import InputForm from "./InputForm";
import TodoListHeader from "./TodoListHeader";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "./store/store";
import {addTodolistAC, TodolistDomainType} from "./store/todolist-reducer";

function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStoreType, TodolistDomainType[]>(state => state.todolists)

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
