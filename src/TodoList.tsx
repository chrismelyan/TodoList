import React from 'react';
import TodoListHeader from "./TodoListHeader";
import TodoListForm from "./TodoListForm";
import {useDispatch, useSelector} from "react-redux";
import {removeTodolistAC, TodolistDomainType} from "./store/todolist-reducer";
import {AppRootStoreType} from "./store/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TodoListPropsType = {
    todolist: TodolistDomainType
}

const TodoList = (props: TodoListPropsType) => {
    const dispatch = useDispatch()
    const todolistID = props.todolist.id

    let tasksForTodolist = useSelector<AppRootStoreType, TaskType[]>(state => state.tasks[todolistID]);
    if (props.todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
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