import React, {ChangeEvent, useCallback} from 'react';
import {TaskStatuses} from "./api/todolists-api";
import EditableSpan from "./EditableSpan";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch} from "react-redux";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Checkbox, IconButton} from "@mui/material";

type TaskPropsType = {
    todolistID: string
    id: string
    status: TaskStatuses
    title: string
}
const Task: React.FC<TaskPropsType> = ({todolistID, id, status, title}) => {
    const dispatch = useDispatch()
    const removeTask = (taskID: string) => {
        dispatch(removeTaskAC(taskID, todolistID))
    }
    const changeStatus = (taskID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(taskID, status, todolistID))
    }
    const updateTask = useCallback((taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todolistID))
    }, [dispatch, todolistID])
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(id, e.currentTarget.checked
            ? TaskStatuses.Completed
            : TaskStatuses.New)
    }
    const updateTaskHandler = (title: string) => {
        updateTask(id, title)
    }

    return (
        <div>
            <Checkbox color={'primary'} onChange={changeTaskStatus} checked={status === TaskStatuses.Completed}/>
            <EditableSpan value={title} callbackUpdate={updateTaskHandler}/>
            <IconButton onClick={() => removeTask(id)}>
                <HighlightOffIcon color={'inherit'}/>
            </IconButton>
        </div>
    );
};

export default Task;