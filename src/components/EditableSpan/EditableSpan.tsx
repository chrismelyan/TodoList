import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import {RequestStatusType} from "../../app/app-reducer";

type EditableSpanType = {
    value: string
    callbackUpdate: (title: string) => void
    entityStatus: RequestStatusType
}

const EditableSpan = React.memo((props: EditableSpanType) => {
        const [edit, setEdit] = useState<boolean>(false);
        const [title, setTitle] = useState<string>('')

        const activateEditMode = () => {
            setEdit(true)
            setTitle(props.value)
        }
        const deactivateEditMode = () => {
            props.callbackUpdate(title)
            setEdit(false)
        }
        const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        return (
            edit
                ? <TextField variant="outlined"
                             value={title}
                             onChange={changeTitle}
                             autoFocus
                             onBlur={deactivateEditMode}
                             size={'small'}
                />
                : <span onDoubleClick={activateEditMode}>{props.value}</span>
        );
    }
);

export default EditableSpan;