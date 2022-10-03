import React, {useCallback, useEffect} from 'react';
import {FilterValuesType, TodolistDomainType} from "./todolist-reducer";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import Task from "./task/Task";
import {Button, IconButton, List} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../api/types";
import {useActions, useAppDispatch} from "../../../utils/redux-utils";
import {tasksActions, todolistActions} from "../index";

type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}

const TodoList = React.memo(function ({tasks, todolist}: TodoListPropsType) {
    const dispatch = useAppDispatch()
    const todolistId = todolist.id

    const {changeTodolistTitle, removeTodolist, changeFilterAC} = useActions(todolistActions)
    const {addTask, getTasks} = useActions(tasksActions)

    useEffect(() => {
        getTasks(todolistId)
    }, [])

    const addTaskCallback = useCallback((title: string) => {
        addTask({todolistId, title})
    }, [todolistId])

    const removeTodo = () => {
        removeTodolist(todolistId)
    }

    const changeTodoTitle = useCallback((title: string) => {
        changeTodolistTitle({todolistId, title})
    }, [dispatch, todolistId])

    const onFilterButton = useCallback((value: FilterValuesType) => {
        changeFilterAC({todolistId, value})
    }, [todolistId])

    let tasksForTodolist = tasks;
    if (todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <div>
                <h3><EditableSpan value={todolist.title} callbackUpdate={changeTodoTitle}/>
                    <IconButton onClick={removeTodo} disabled={todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm callbackAddValue={addTaskCallback} entityStatus={todolist.entityStatus}/>
            </div>
            <List>
                {tasksForTodolist.map(t => <Task key={t.id} task={t}/>)}
                {!tasksForTodolist.length && <div style={{padding: '10px', color: 'black'}}>No tasks</div>}
            </List>
            <div>
                <Button variant={todolist.filter === 'all' ? 'contained' : 'text'} color={'secondary'}
                        onClick={() => onFilterButton('all')}>All
                </Button>
                <Button variant={todolist.filter === 'active' ? 'contained' : 'text'} color={'primary'}
                        onClick={() => onFilterButton('active')}>Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? 'contained' : 'text'} color={'inherit'}
                        onClick={() => onFilterButton('completed')}>Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList;