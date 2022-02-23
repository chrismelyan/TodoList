import React from 'react';
import './App.css'
import {FilterValuesType} from "./App";

type TodoListHeaderPropsType = {
    title: string
    filter: FilterValuesType
}
const TodoListHeader = (props: TodoListHeaderPropsType) => {
    let text = 'all'
    switch (props.filter) {
        case 'active':
            text = 'act'
            break
        case 'completed':
            text = 'cmp'
            break
    }
    return <h3>{props.title} <span className={'filter-header'}>{text}</span></h3>
};

export default TodoListHeader;