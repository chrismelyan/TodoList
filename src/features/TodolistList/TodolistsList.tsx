import React, {useCallback, useEffect} from 'react';
import {useSelector} from "react-redux";
import {Grid, Paper} from "@mui/material";
import TodoList from "./todolist/TodoList";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {useNavigate} from "react-router-dom";
import {authSelectors} from "../Auth";
import {todolistActions, todolistSelectors} from "./index";
import {useActions, useAppDispatch} from "../../utils/redux-utils";

const TodolistsList = () => {
    const dispatch = useAppDispatch()

    const todolists = useSelector(todolistSelectors.selectTodolists);
    const tasks = useSelector(todolistSelectors.selectTasks);
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
    const navigate = useNavigate()

    const {getTodolists, addTodolist} = useActions(todolistActions)

    useEffect(() => {
        if(isLoggedIn) {
            getTodolists()
        } else {
            navigate('/login')
        }
    }, [isLoggedIn])

    const addTodolists = useCallback((title: string) => {
            addTodolist(title)
    }, [dispatch])

    return (
        <div>
            <Grid container style={{padding: '30px'}}>
                <Paper style={{padding: '20px', background: 'rgb(255,250,250, 0.9)'}}>
                    <AddItemForm callbackAddValue={addTodolists}/>
                </Paper>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(el => {
                    let todolistTasks = tasks[el.id]

                    return <Grid key={el.id} item>
                            <Paper style={{padding: '15px', background: 'rgb(255,250,250, 0.9)'}} elevation={3}>
                                <TodoList todolist={el} key={el.id} tasks={todolistTasks}/>
                            </Paper>
                        </Grid>
                    }
                )}
            </Grid>
        </div>
    );
};

export default TodolistsList;