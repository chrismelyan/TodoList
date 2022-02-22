import React from 'react';
import {TaskType} from "./TodoList";

type TaskPropsType = TaskType & {
    removeTask: (taskID: string) => void
}

const Task = (props: TaskPropsType) => {
    // let taskClass = ''
    // if(props.isDone) {
    //     taskClass += ' completed-task'
    // }
    let taskClass = `task ${props.isDone ? 'completed-task' : ''}`

    // let classes = ['task']              // className={'task completed-task'} - два класса на спане. ClassName возвращает строку!!!
    // if(props.isDone) {
    //     classes.push('completes-task')
    // }

    return (
            <li>
                <input type="checkbox" checked={props.isDone}/>
                <span className={taskClass}>{props.title}</span>
                <button onClick={() => props.removeTask(props.id)}>x</button>
            </li>
    );
};

export default Task;