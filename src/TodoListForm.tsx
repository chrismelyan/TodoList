import React, {useCallback} from 'react';
import TasksList from "./TasksList";
import Buttons from "./Buttons";
import InputForm from "./InputForm";
import {useDispatch} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {changeFilterAC, FilterValuesType} from "./store/todolist-reducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";

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
    }, [dispatch, props.todolistID])

    const removeTask = (taskID: string) => {
        dispatch(removeTaskAC(taskID, props.todolistID))
    }
    const changeTaskStatus = (taskID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(taskID, status, props.todolistID))
    }
    const updateTask = useCallback((taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(taskID, title, props.todolistID))
    }, [dispatch, props.todolistID])

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