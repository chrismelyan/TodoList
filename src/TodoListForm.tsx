import React from 'react';
import TasksList from "./TasksList";
import Buttons from "./Buttons";
import InputForm from "./InputForm";
import {TaskType} from "./TodoList";
import {FilterValuesType} from "./App";

type TodoListFormPropsType = {
    tasks: TaskType[]
    filter: FilterValuesType
    todolistID: string
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, filter: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
}

const TodoListForm = (props: TodoListFormPropsType) => {
    return (
        <div>
            <InputForm
                todolistID={props.todolistID}
                addTask={props.addTask}
            />
            <TasksList
                todolistID={props.todolistID}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />
            <Buttons
                todolistID={props.todolistID}
                changeFilter={props.changeFilter}
                filter={props.filter}
            />
        </div>
    );
};

export default TodoListForm;