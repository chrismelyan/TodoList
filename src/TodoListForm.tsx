import React from 'react';
import TasksList from "./TasksList";
import Buttons from "./Buttons";
import InputForm from "./InputForm";
import {TaskType} from "./TodoList";
import {FilterValuesType} from "./App";

type TodoListFormPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

const TodoListForm = (props: TodoListFormPropsType) => {
    return (
        <div>
            <InputForm />
            <TasksList
                tasks={props.tasks}
                removeTask={props.removeTask}
            />
            <Buttons changeFilter={props.changeFilter}/>
        </div>
    );
};

export default TodoListForm;