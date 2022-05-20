import React, {useCallback, useEffect} from 'react';
import {addTodolistTC, getTodolistsTC, TodolistDomainType} from "./todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType, useAppSelector} from "../../app/store";
import {Grid, Paper} from "@mui/material";
import TodoList from "./todolist/TodoList";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {useNavigate} from "react-router-dom";

const TodolistsList = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStoreType, TodolistDomainType[]>(state => state.todolists);
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const navigate = useNavigate()

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(getTodolistsTC())
        } else {
            navigate('login')
        }
    }, [isLoggedIn])

    const addTodolist = useCallback((title: string) => {
            dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <div>
            <Grid container style={{padding: '30px'}}>
                <Paper style={{padding: '20px', background: 'rgb(255,250,250, 0.9)'}}>
                    <AddItemForm callbackAddValue={addTodolist}/>
                </Paper>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(el => <Grid key={el.id} item>
                        <Paper style={{padding: '15px', background: 'rgb(255,250,250, 0.9)'}} elevation={3}>
                            <TodoList todolist={el} key={el.id}/>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default TodolistsList;