import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "../features/todolist-list/todolist/TodoList";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType, useAppSelector} from "./store";
import {TodolistDomainType, getTodolistsTC, addTodolistTC} from "../features/todolist-list/todolist-reducer";
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {RequestStatusType} from "./app-reducer";

function App() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status);

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStoreType, TodolistDomainType[]>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <div className="App">
            <ErrorSnackbar />
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
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            </Box>
            <Container fixed>
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
                    </Grid>)}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
