import React from 'react';
import {FilterValuesType} from "./App";

type ButtonsType = {
    changeFilter: (filter: FilterValuesType) => void
}

const Buttons = (props: ButtonsType) => {
    const onClickSetFilter = (filter: FilterValuesType) => () => props.changeFilter(filter)
    return (
        <div>
            <button onClick={onClickSetFilter('all')}>All</button>
            <button onClick={onClickSetFilter('active')}>Active</button>
            <button onClick={onClickSetFilter('completed')}>Completed</button>
        </div>
    );
};

export default Buttons;