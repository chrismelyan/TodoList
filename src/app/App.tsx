import React, {useCallback, useEffect} from 'react';
import './App.css';
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
import {Navigate, Route, Routes} from "react-router-dom";
import TodolistsList from "../features/TodolistList/TodolistsList";
import {useSelector} from "react-redux";
import {selectIsInitialized, selectStatus} from "../features/App/selectors";
import {authActions, authSelectors, Login} from "../features/Auth";
import {useActions} from "../utils/redux-utils";
import {appActions} from "../features/App";

function App() {
    const status = useSelector(selectStatus);
    const isInitialized = useSelector(selectIsInitialized);
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);

    const {logout} = useActions(authActions)
    const {initializedApp} = useActions(appActions)

    const logoutHandler = useCallback(() => logout(), [])

    useEffect(() => {
            initializedApp()
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
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'404'} element={<h1 style={{textAlign: 'center', color: 'white'}}>404 page not found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
