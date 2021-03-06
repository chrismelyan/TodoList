import React, {ChangeEvent, useCallback} from 'react';
import {TaskStatuses} from "../../../../api/todolists-api";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {changeTaskStatusTC, changeTaskTitleAC, removeTaskTC} from "../../tasks-reducer";
import {useDispatch} from "react-redux";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Checkbox, IconButton} from "@mui/material";
import {RequestStatusType} from "../../../../app/app-reducer";

type TaskPropsType = {
    todolistID: string
    id: string
    status: TaskStatuses
    title: string
    entityStatus: RequestStatusType
}
const Task: React.FC<TaskPropsType> = ({todolistID, id, status, title, entityStatus}) => {
    const dispatch = useDispatch()
    const removeTask = (taskID: string) => {
        dispatch(removeTaskTC(taskID, todolistID))
    }
    const changeStatus = useCallback((taskID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(todolistID, taskID, status))
    }, [dispatch, todolistID])

    const updateTask = useCallback((taskID: string, title: string) => {
        dispatch(changeTaskTitleAC({taskID: taskID, title:title, todolistID: todolistID}))
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
            <EditableSpan entityStatus={entityStatus} value={title} callbackUpdate={updateTaskHandler}/>
            <IconButton onClick={() => removeTask(id)}>
                <HighlightOffIcon color={'inherit'}/>
            </IconButton>
        </div>
    );
};

export default Task;