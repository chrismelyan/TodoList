import React from 'react';
import TodoListHeader from "./TodoListHeader";
import TodoListForm from "./TodoListForm";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList = (props: TodoListPropsType) => {
    return (
            <div>
                <TodoListHeader title={props.title} />
                <TodoListForm
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeFilter={props.changeFilter}
                    addTask={props.addTask}
                />
            </div>
    );
};

export default TodoList;