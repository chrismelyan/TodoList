import React from 'react';
import {FilterValuesType} from "./App";

type ButtonsType = {
    changeFilter: (filter: FilterValuesType) => void
}

const Buttons = (props: ButtonsType) => {
    return (
        <div>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    );
};

export default Buttons;