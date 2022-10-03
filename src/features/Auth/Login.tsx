import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Paper} from "@mui/material";
import {FormikHelpers, useFormik} from "formik";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {authActions, authSelectors} from "./index";
import {useAppDispatch} from "../../utils/redux-utils";
import {login} from "./auth-reducer";

type FormikType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            if (!values.email) {
                return {email: 'Email is equired'};
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {email: 'Invalid email address'};
            }

            if (!values.password) {
                return {password: 'Password is required'};
            } else if (values.password.length < 3) {
                return {password: 'Minimum 3 symbols'};
            }
        },
        onSubmit: async (values: FormikType, formikHelpers: FormikHelpers<FormikType>) => {
            const action = await dispatch(authActions.login(values));
            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'} style={{padding: '30px'}}>
        <Grid item justifyContent={'center'}>
            <Paper style={{padding: '20px', background: 'rgb(255,250,250, 0.9)'}}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>{'To log in get registered '}
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}
                                   rel="noopener noreferrer">here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email
                                && formik.errors.email
                                && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password
                                && formik.errors.password
                                && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox checked={formik.values.rememberMe}/>}
                                {...formik.getFieldProps('rememberMe')}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Paper>
        </Grid>
    </Grid>
}
