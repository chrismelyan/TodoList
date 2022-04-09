import React from 'react';
import {FilterValuesType} from "./App";

type ButtonsType = {
    changeFilter: (filter: FilterValuesType) => void
    filter: FilterValuesType
}

const Buttons = (props: ButtonsType) => {
    const onClickSetFilter = (filter: FilterValuesType) => () => props.changeFilter(filter)
    return (
        <div>
            <button className={props.filter === 'all' ? 'button-active' : ''} onClick={onClickSetFilter('all')}>All</button>
            <button className={props.filter === 'active' ? 'button-active' : ''} onClick={onClickSetFilter('active')}>Active</button>
            <button className={props.filter === 'completed' ? 'button-active' : ''} onClick={onClickSetFilter('completed')}>Completed</button>
        </div>
    );
};

export default Buttons;