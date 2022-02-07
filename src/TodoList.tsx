import React from 'react';
import TodoListHeader from "./TodoListHeader";
import TodoListForm from "./TodoListForm";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}
export type TaskType = {
    id: number
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
                />
            </div>
    );
};

export default TodoList;