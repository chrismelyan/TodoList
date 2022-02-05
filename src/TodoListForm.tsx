import React from 'react';
import TasksList from "./TasksList";
import Buttons from "./Buttons";
import InputForm from "./InputForm";
import {TaskType} from "./TodoList";

type TodoListFormPropsType = {
    tasks: Array<TaskType>
}

const TodoListForm = (props: TodoListFormPropsType) => {
    return (
        <div>
            <InputForm />
            <TasksList tasks={props.tasks}/>
            <Buttons />
        </div>
    );
};

export default TodoListForm;