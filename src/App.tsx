import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "./store/store";
import {TodolistDomainType, addTodolistAC} from "./store/todolist-reducer";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStoreType, TodolistDomainType[]>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color={'secondary'}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TO DO LIST
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: '30px'}}>
                    <Paper style={{padding: '20px', background: 'rgb(252, 247, 252, 0.6)'}}>
                    <AddItemForm callbackAddValue={addTodolist}/>
                    </Paper>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => <Grid item>
                        <Paper style={{padding: '15px', background: 'rgb(252, 247, 252, 0.6)'}} elevation={3}>
                        <TodoList key={el.id} todolist={el}/>
                        </Paper>
                    </Grid>)}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
