import React, {ChangeEvent, useState, KeyboardEvent} from 'react';


type InputFormType = {
    callbackAddValue: (title: string) => void
}
const InputForm: React.FC<InputFormType> = ({callbackAddValue}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            callbackAddValue(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickAddTask()
    }

    const errorMessage = error && <div style={{color: 'red', fontSize: '10px'}}>Title is required</div>
    const inputClass = `input ${error ? 'error' : ''}`

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressSetTitle}
                className={inputClass}
            />
            <button className={'button-sign'} onClick={onClickAddTask}>+</button>
            {errorMessage}
        </div>
    );
};

export default InputForm;

