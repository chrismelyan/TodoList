import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    changeFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType
} from "./store/todolist-reducer";
import {AppRootStoreType} from "./store/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {addTaskAC} from "./store/tasks-reducer";
import Task from "./Task";

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
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }
    const changeFilter = (value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    }
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, todolistID))
    }, [dispatch, todolistID])

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolistID))
    }

    return (
        <div>
            <div>
                <h3><EditableSpan value={props.todolist.title} callbackUpdate={changeTodolistTitle}/>
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <AddItemForm callbackAddValue={addTask}/>
            </div>
            <ul>
                {
                    tasksForTodolist.map(task => <Task
                        key={task.id}
                        todolistID={todolistID}
                        id={task.id}
                        status={task.status}
                        title={task.title}
                    />)
                }
            </ul>
            <div>
                <button className={props.todolist.filter === 'all' ? 'button-active' : ''}
                        onClick={() => changeFilter('all')}>All
                </button>
                <button className={props.todolist.filter === 'active' ? 'button-active' : ''}
                        onClick={() => changeFilter('active')}>Active
                </button>
                <button className={props.todolist.filter === 'completed' ? 'button-active' : ''}
                        onClick={() => changeFilter('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;