import React from 'react';
import TodoListHeader from "./TodoListHeader";
import TodoListForm from "./TodoListForm";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
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
                <TodoListForm tasks={props.tasks} />
            </div>
    );
};

export default TodoList;