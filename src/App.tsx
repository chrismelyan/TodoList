import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "./store/store";
import {TodolistDomainType, addTodolistAC} from "./store/todolist-reducer";

function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStoreType, TodolistDomainType[]>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
       dispatch(addTodolistAC(title))
    },[dispatch])

    return (
        <div className="App">
            <div>
                <AddItemForm callbackAddValue={addTodolist}/>
            </div>
            {
                todolists.map(el => <TodoList
                        key={el.id}
                        todolist={el}
                    />)}
        </div>
    );
}

export default App;
