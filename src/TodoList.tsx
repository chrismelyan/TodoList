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
    changeFilter: (todolistID: string, filter: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    updateTask: (todolistID: string, taskID: string, title: string) => void
    updateTodolist: (todolistID: string, title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <div style={{display: 'flex'}}>
                <TodoListHeader title={props.title} filter={props.filter}/>
                <button className={'button-sign'} onClick={() => props.removeTodolist(props.todolistID)}>x</button>
            </div>
            <TodoListForm
                todolistID={props.todolistID}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeFilter={props.changeFilter}
                addTask={props.addTask}
                filter={props.filter}
                changeTaskStatus={props.changeTaskStatus}
                updateTask={props.updateTask}
            />
        </div>
    );
};

export default TodoList;