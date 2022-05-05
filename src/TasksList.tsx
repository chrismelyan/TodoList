import React, {ChangeEvent} from 'react';
import './App.css'
import EditableSpan from "./EditableSpan";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TasksListPropsType = {
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses) => void
    updateTask: (taskID: string, title: string) => void
}

const TasksList = (props: TasksListPropsType) => {

    const tasksComponents = props.tasks.map(task => {
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            // props.changeTaskStatus(props.id, !props.isDone) - почему работает
            props.changeTaskStatus(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
        }
        const updateTaskHandler = (title: string) => {
            props.updateTask(task.id, title)
        }

        const spanClass = `span ${task.status === TaskStatuses.Completed ? 'completed-task' : ''}`

        return (
            <li key={task.id}>
                <div className={'task'}>
                    <div className={'item'}>
                        <input type="checkbox" onChange={changeTaskStatus} checked={task.status === TaskStatuses.Completed}/>
                        <EditableSpan className={spanClass} title={task.title} callbackUpdate={updateTaskHandler}/>
                    </div>
                    <button className={'button-sign'} onClick={() => props.removeTask(task.id)}>x</button>
                </div>
            </li>
        );
    })

    return (tasksComponents.length
        ? <ul>
            {tasksComponents}
        </ul>
            : <span className={'empty-list'}>Task list is empty</span>
    );
};

export default TasksList;