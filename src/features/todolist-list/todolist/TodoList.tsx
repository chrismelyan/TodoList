import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    changeFilterAC, changeTodolistTitleTC, deleteTodolistTC,
    FilterValuesType, TodolistDomainType
} from "../todolist-reducer";
import {AppRootStoreType} from "../../../app/store";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {addTaskTC} from "../tasks-reducer";
import Task from "./task/Task";
import {Button, IconButton, List} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {RequestStatusType} from "../../../app/app-reducer";

type TodoListPropsType = {
    todolist: TodolistDomainType
}

const TodoList = (props: TodoListPropsType) => {
    const dispatch = useDispatch()
    const todolistId = props.todolist.id
    const entityStatus = useSelector<AppRootStoreType, RequestStatusType>(state => state.app.status);

    let tasksForTodolist = useSelector<AppRootStoreType, TaskType[]>(state => state.tasks[todolistId]);
    if (props.todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch, todolistId])

    const changeFilter = useCallback((value: FilterValuesType) => {
        dispatch(changeFilterAC({todolistId, value}))
    }, [dispatch, todolistId])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch, todolistId])

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodolistTC(todolistId))
    },[dispatch, todolistId])

    return (
        <div>
            <div>
                <h3><EditableSpan
                    value={props.todolist.title}
                    callbackUpdate={changeTodolistTitle}
                    entityStatus={entityStatus}/>
                    <IconButton onClick={removeTodolist} disabled={entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm callbackAddValue={addTask} entityStatus={entityStatus}/>
            </div>
            <List>
                {
                    tasksForTodolist.map(task => <Task
                        key={task.id}
                        todolistId={todolistId}
                        id={task.id}
                        status={task.status}
                        title={task.title}
                        entityStatus={entityStatus}
                    />)
                }
            </List>
            <div>
                <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'} color={'secondary'}
                        onClick={() => changeFilter('all')}>All
                </Button>
                <Button variant={props.todolist.filter === 'active' ? 'contained' : 'text'} color={'primary'}
                        onClick={() => changeFilter('active')}>Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? 'contained' : 'text'} color={'inherit'}
                        onClick={() => changeFilter('completed')}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;