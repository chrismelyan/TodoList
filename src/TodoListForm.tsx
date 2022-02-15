import React from 'react';
import TasksList from "./TasksList";
import Buttons from "./Buttons";
import InputForm from "./InputForm";
import {TaskType} from "./TodoList";
import {FilterValuesType} from "./App";

type TodoListFormPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoListForm = (props: TodoListFormPropsType) => {
    return (
        <div>
            <InputForm addTask={props.addTask}/>
            <TasksList
                tasks={props.tasks}
                removeTask={props.removeTask}
            />
            <Buttons changeFilter={props.changeFilter}/>
        </div>
    );
};

export default TodoListForm;