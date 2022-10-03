import React, {ChangeEvent, useCallback} from 'react';
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Checkbox, IconButton} from "@mui/material";
import {TaskStatuses, TaskType} from "../../../../api/types";
import {useActions} from "../../../../utils/redux-utils";
import {tasksActions} from "../../index";

type TaskPropsType = {
    task: TaskType
}
const Task: React.FC<TaskPropsType> = ({task}) => {
    const taskId = task.id
    const todolistId = task.todoListId

    const {removeTask, updateTask} = useActions(tasksActions)

    const removeTaskCallback = useCallback(() => {
        removeTask({taskId: taskId, todolistId: todolistId})
    }, [taskId, todolistId])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
       updateTask({todolistId, taskId, model: {status: e.currentTarget.checked
                   ? TaskStatuses.Completed
                   : TaskStatuses.New}})
    }, [todolistId, taskId])

    const updateTaskTitle = useCallback((title: string) => {
        updateTask({todolistId, taskId, model: {title}})
    }, [todolistId, taskId])

    return (
        <div>
            <Checkbox color={'primary'} onChange={changeStatus} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan value={task.title} callbackUpdate={updateTaskTitle}/>
            <IconButton onClick={removeTaskCallback}>
                <HighlightOffIcon color={'inherit'}/>
            </IconButton>
        </div>
    );
};

export default Task;