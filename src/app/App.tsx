import React, {useEffect} from 'react';
import './App.css';
import {useAppSelector} from "./store";
import {
    AppBar,
    Box,
    Button, CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import {Navigate, Route, Routes} from "react-router-dom";
import TodolistsList from "../features/todolist-list/TodolistsList";
import {Login} from "../components/Login/Login";
import {useDispatch} from "react-redux";
import {logoutTC} from "../components/Login/auth-reducer";

function App() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status);
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized);
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logoutTC());
    }

    useEffect(() => {
            dispatch(initializedAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            </Box>
            <Container fixed>
                <Routes>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'404'} element={<h1 style={{textAlign: 'center', color: 'white'}}>404 page not found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
