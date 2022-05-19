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

export const Login = () => {
    return <Grid container justifyContent={'center'} style={{padding: '30px'}}>
        <Grid item justifyContent={'center'}>
            <Paper style={{padding: '20px', background: 'rgb(255,250,250, 0.9)'}}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField label="Email" margin="normal"/>
                    <TextField type="password" label="Password"
                               margin="normal"
                    />
                    <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
            </Paper>
        </Grid>
    </Grid>
}
