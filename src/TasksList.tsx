import React from 'react';
import Task from "./Task";
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasks: Array<TaskType>
}

const TasksList = (props: TasksListPropsType) => {
    return (
        <ul>
            <Task {...props.tasks[0]} />
            <Task {...props.tasks[1]} />
            <Task {...props.tasks[2]} />
            <Task {...props.tasks[3]} />
        </ul>
    );
};

export default TasksList;