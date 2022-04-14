import React, {useCallback} from 'react';
import TasksList from "./TasksList";
import Buttons from "./Buttons";
import InputForm from "./InputForm";
import {TaskType} from "./TodoList";
import {FilterValuesType} from "./App";
import {useDispatch} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {changeFilterAC} from "./store/todolist-reducer";

type TodoListFormPropsType = {
    tasks: TaskType[]
    filter: FilterValuesType
    todolistID: string
}

const TodoListForm = (props: TodoListFormPropsType) => {
    const dispatch = useDispatch()

    const changeFilter = (value: FilterValuesType) => {
        dispatch(changeFilterAC(props.todolistID, value))
    }
    const callbackAddValue = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolistID))
    }, [dispatch])

    const removeTask = (taskID: string) => {
        dispatch(removeTaskAC(taskID, props.todolistID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskID, isDone, props.todolistID))
    }
    const updateTask = useCallback((taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(taskID, title, props.todolistID))
    }, [dispatch])

    return (
        <div>
            <InputForm
                callbackAddValue={callbackAddValue}
            />
            <TasksList
                tasks={props.tasks}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                updateTask={updateTask}
            />
            <Buttons
                changeFilter={changeFilter}
                filter={props.filter}
            />
        </div>
    );
};

export default TodoListForm;