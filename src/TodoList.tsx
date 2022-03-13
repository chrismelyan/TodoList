import React from 'react';
import TodoListHeader from "./TodoListHeader";
import TodoListForm from "./TodoListForm";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    todolistID: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList = (props: TodoListPropsType) => {
    return (
            <div>
                <TodoListHeader title={props.title} filter={props.filter}/>
                <TodoListForm
                    todolistID={props.todolistID}
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeFilter={props.changeFilter}
                    addTask={props.addTask}
                    filter={props.filter}
                    changeTaskStatus={props.changeTaskStatus}
                />
            </div>
    );
};

export default TodoList;