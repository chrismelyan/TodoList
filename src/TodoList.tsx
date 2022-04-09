import React from 'react';
import TodoListHeader from "./TodoListHeader";
import TodoListForm from "./TodoListForm";
import {TodolistType} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {removeTodolistAC} from "./store/todolist-reducer";
import {AppRootStoreType} from "./store/store";

type TodoListPropsType = {
    todolist: TodolistType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList = (props: TodoListPropsType) => {
    const dispatch = useDispatch()
    const todolistID = props.todolist.id

    let tasksForTodolist = useSelector<AppRootStoreType, TaskType[]>(state => state.tasks[todolistID]);
    if (props.todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolistID))
    }


    return (
        <div>
            <div style={{display: 'flex'}}>
                <TodoListHeader title={props.todolist.title} filter={props.todolist.filter}/>
                <button className={'button-sign'} onClick={removeTodolist}>x</button>
            </div>
            <TodoListForm
                todolistID={todolistID}
                tasks={tasksForTodolist}
                filter={props.todolist.filter}
            />
        </div>
    );
};

export default TodoList;