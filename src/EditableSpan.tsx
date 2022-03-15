import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callbackUpdate: (title: string) => void
    className: string
}

const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')

    const onDoubleClickHandler = () => {
        setEdit(true)
        setTitle(props.title)
    }

    const OnBlurHandler = () => {
        props.callbackUpdate(title)
        setEdit(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
            edit
            ? <input value={title} onChange={onChangeHandler} autoFocus onBlur={OnBlurHandler}/>
            : <span className={props.className} onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

export default EditableSpan;