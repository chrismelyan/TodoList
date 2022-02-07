import React from 'react';
import Task from "./Task";
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
}

//отрисовывает список соответсвенно колличеству тасков
// (преобразовываем массивы одного типа в массивы другого типа)
const TasksList = (props: TasksListPropsType) => {
    const tasksComponents = props.tasks.map(task => {
        return <Task
            key={task.id}
            {...task}
            removeTask={props.removeTask}
        />
    })

    return (
        <ul>
            {tasksComponents}
        </ul>
    );
};

export default TasksList;