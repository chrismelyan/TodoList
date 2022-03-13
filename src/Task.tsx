import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";

type TaskPropsType = TaskType & {
    todolistID: string
    removeTask: (todolistID: string, taskID: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
}

const Task = (props: TaskPropsType) => {
    let taskClass = `task ${props.isDone ? 'completed-task' : ''}`
    // let classes = ['task']              // className={'task completed-task'} - два класса на спане. ClassName возвращает строку!!!
    // if(props.isDone) {
    //     classes.push('completes-task')
    // }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        // props.changeTaskStatus(props.id, !props.isDone) - почему работает
        props.changeTaskStatus(props.todolistID, props.id, e.currentTarget.checked)
    }

    return (
            <li>
                <input type="checkbox" onChange={changeTaskStatus} checked={props.isDone}/>
                <span className={taskClass}>{props.title}</span>
                <button onClick={() => props.removeTask(props.todolistID, props.id)}>x</button>
            </li>
    );
};

export default Task;