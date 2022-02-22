import React from 'react';
import {FilterValuesType} from "./App";

type TodoListHeaderPropsType = {
    title: string
    filter: FilterValuesType
}
const TodoListHeader = (props: TodoListHeaderPropsType) => {
    return <h3>{props.title}</h3>
};

export default TodoListHeader;