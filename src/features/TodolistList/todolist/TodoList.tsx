import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {
    changeFilterAC, changeTodolistTitleTC, deleteTodolistTC,
    FilterValuesType, TodolistDomainType
} from "../todolist-reducer";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {addTaskTC} from "../tasks-reducer";
import Task from "./task/Task";
import {Button, IconButton, List} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../api/types";

type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}

const TodoList = React.memo(function ({tasks, todolist}: TodoListPropsType) {
    const dispatch = useDispatch()
    const todolistId = todolist.id

    let tasksForTodolist = tasks;
    if (todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch, todolistId])

    const changeFilter = useCallback((value: FilterValuesType) => {
        dispatch(changeFilterAC({todolistId, value}))
    }, [dispatch, todolistId])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC({todolistId, title}))
    }, [dispatch, todolistId])

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch, todolistId])

    return (
        <div>
            <div>
                <h3><EditableSpan value={todolist.title} callbackUpdate={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm callbackAddValue={addTask} entityStatus={todolist.entityStatus}/>
            </div>
            <List>
                {tasksForTodolist.map(t => <Task key={t.id} task={t}/>)}
                {!tasksForTodolist.length && <div style={{padding: '10px', color: 'white'}}>No tasks</div>}
            </List>
            <div>
                <Button variant={todolist.filter === 'all' ? 'contained' : 'text'} color={'secondary'}
                        onClick={() => changeFilter('all')}>All
                </Button>
                <Button variant={todolist.filter === 'active' ? 'contained' : 'text'} color={'primary'}
                        onClick={() => changeFilter('active')}>Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? 'contained' : 'text'} color={'inherit'}
                        onClick={() => changeFilter('completed')}>Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList;