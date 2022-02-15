import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type InputFormType = {
    addTask: (title: string) => void
}
const InputForm: React.FC<InputFormType> = ({addTask}) => {
    const [title, setTitle] = useState<string>('')
    console.log(title)
    const onClickAddTask = () => {
        addTask(title)
        setTitle('')
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        console.log(e.nativeEvent)
    }
    const onKeyPressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onClickAddTask()
        }
    }
    return (
        <div>
            <input
                value={title}
            onChange={onChangeSetTitle}
                onKeyPress={onKeyPressSetTitle}
            />
            <button onClick={onClickAddTask}>+</button>
        </div>
    );
};

export default InputForm;

// const InputForm = (props: InputFormType) => {
//
//     return (
//         <div>
//             <input/>
//             <button onClick={() => props.addTask("New Task")}>+</button>
//         </div>
//     );
// };