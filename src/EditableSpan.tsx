import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    value: string
    callbackUpdate: (title: string) => void
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
                ? <input value={title} onChange={changeTitle} autoFocus onBlur={deactivateEditMode}/>
                : <span onDoubleClick={activateEditMode}>{props.value}</span>
        );
    }
);

export default EditableSpan;