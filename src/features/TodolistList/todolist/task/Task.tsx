import React, {ChangeEvent, useCallback} from 'react';
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {removeTaskTC, updateTaskTC} from "../../tasks-reducer";
import {useDispatch} from "react-redux";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Checkbox, IconButton} from "@mui/material";
import {TaskStatuses, TaskType} from "../../../../api/types";

type TaskPropsType = {
    task: TaskType
}
const Task: React.FC<TaskPropsType> = ({task}) => {
    const dispatch = useDispatch()
    const taskId = task.id
    const todolistId = task.todoListId

    const removeTask = (taskId: string) => {
        dispatch(removeTaskTC({taskId: taskId, todolistId: todolistId}))
    }
    const changeStatus = useCallback((taskId: string, status: TaskStatuses) => {
        const model = {...task, status}
        dispatch(updateTaskTC({todolistId, taskId, model}))
    }, [dispatch, todolistId])

    const updateTask = useCallback((taskId: string, title: string) => {
        const model = {...task, title}
        dispatch(updateTaskTC({todolistId, taskId, model}))
    }, [dispatch, todolistId])

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(taskId, e.currentTarget.checked
            ? TaskStatuses.Completed
            : TaskStatuses.New)
    }
    const updateTaskHandler = (title: string) => {
        updateTask(taskId, title)
    }

    return (
        <div>
            <Checkbox color={'primary'} onChange={changeTaskStatus} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan value={task.title} callbackUpdate={updateTaskHandler}/>
            <IconButton onClick={() => removeTask(taskId)}>
                <HighlightOffIcon color={'inherit'}/>
            </IconButton>
        </div>
    );
};

export default Task;