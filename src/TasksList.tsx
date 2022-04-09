import React, {ChangeEvent} from 'react';
import './App.css'
import {TaskType} from "./TodoList";
import EditableSpan from "./EditableSpan";

type TasksListPropsType = {
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    updateTask: (taskID: string, title: string) => void
}

const TasksList = (props: TasksListPropsType) => {

    const tasksComponents = props.tasks.map(task => {
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            // props.changeTaskStatus(props.id, !props.isDone) - почему работает
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }
        const updateTaskHandler = (title: string) => {
            props.updateTask(task.id, title)
        }

        const spanClass = `span ${task.isDone ? 'completed-task' : ''}`

        return (
            <li key={task.id}>
                <div className={'task'}>
                    <div className={'item'}>
                        <input type="checkbox" onChange={changeTaskStatus} checked={task.isDone}/>
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