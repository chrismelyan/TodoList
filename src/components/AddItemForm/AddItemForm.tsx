import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import TextField from '@mui/material/TextField';
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {RequestStatusType} from "../../features/App/app-reducer";

export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void}
type InputFormType = {
    callbackAddValue: (title: string) => void
    entityStatus?: RequestStatusType
}
const AddItemForm: React.FC<InputFormType> = React.memo(({callbackAddValue, entityStatus}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            callbackAddValue(trimmedTitle)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickAddTask()
    }

    return (
        <div>
            <TextField value={title}
                       error={!!error}
                       onChange={onChangeSetTitle}
                       onKeyPress={onKeyPressSetTitle}
                       label={'Title'}
                       className={error ? 'error' : ''}
                       helperText={error}
                       disabled={entityStatus === 'loading'}/>

            <IconButton color="primary" onClick={onClickAddTask}>
                <AddBox fontSize='large'/>
            </IconButton>
        </div>
    );
})

export default AddItemForm;

