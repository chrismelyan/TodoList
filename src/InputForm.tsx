import React, {ChangeEvent, useState, KeyboardEvent} from 'react';


type InputFormType = {
    todolistID: string
    addTask: (todolistID: string, title: string) => void
}
const InputForm: React.FC<InputFormType> = ({todolistID, addTask}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addTask(todolistID, trimmedTitle)
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

    const errorMessage = error && <div style={{color: 'red'}}>Title is required</div>

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressSetTitle}
                className={error ? 'error' : ''}
            />
            <button onClick={onClickAddTask}>+</button>
            {errorMessage}
        </div>
    );
};

export default InputForm;

