import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";
import EditableSpan from "./EditableSpan";

type TaskPropsType = TaskType & {
    todolistID: string
    removeTask: (todolistID: string, taskID: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    callbackUpdate: (title: string) => void
}

const Task = (props: TaskPropsType) => {
    // let taskClass = `task ${props.isDone ? 'completed-task' : ''}`
    // let classes = ['task']              // className={'task completed-task'} - два класса на спане. ClassName возвращает строку!!!
    // if(props.isDone) {
    //     classes.push('completes-task')
    // }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        // props.changeTaskStatus(props.id, !props.isDone) - почему работает
        props.changeTaskStatus(props.todolistID, props.id, e.currentTarget.checked)
    }

    const spanClass = `span ${props.isDone ? 'completed-task' : ''}`

    return (
        <li>
            <div className={'task'}>
                <div className={'item'}>
                    <input type="checkbox" onChange={changeTaskStatus} checked={props.isDone}/>
                    <EditableSpan className={spanClass} title={props.title} callbackUpdate={props.callbackUpdate}/>
                </div>
                <button className={'button-sign'} onClick={() => props.removeTask(props.todolistID, props.id)}>x</button>
            </div>
        </li>
    );
};

export default Task;