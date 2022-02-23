import React from 'react';
import './App.css'
import Task from "./Task";
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

//отрисовывает список соответсвенно колличеству тасков
// (преобразовываем массивы одного типа в массивы другого типа)
const TasksList = (props: TasksListPropsType) => {
    const tasksComponents = props.tasks.map(task => {
        return <Task
            key={task.id}
            {...task}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
        />
    })

    return (tasksComponents.length
        ? <ul>
            {tasksComponents}
        </ul>
            : <span className={'empty-list'}>Task list is empty</span>
    );
};

export default TasksList;