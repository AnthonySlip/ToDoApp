import React, { useEffect, useRef, useState } from 'react';
import { useTaskStore } from '../stores/store';
import '../styles/inputTask.scss';

const InputTask = () => {
    const addTask = useTaskStore((state)=>state.addTask)
    const [text, setText] = useState(false)
    const [shake, setShake] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const input = useRef(null)
    const settingText = () => {
        setText(input.current.value)
    }
    const pushTask = () => {
        if (text) {
            addTask(text)
            setText('')
            input.current.value = ''
        } else {
            input.current.value = 'The Empty Task!'
            setShake('shake')
            setIsDisabled(true)
            setTimeout(()=>{
                input.current.value = ''
                setShake('')
                setIsDisabled(false)
            },1000)
        }
    }

    function handleSubmit(Event) {
        Event.preventDefault()
        pushTask()
    }
    return (
        <form onSubmit={handleSubmit} className={"inputTask "+shake}>
            <input
            ref={input}
            type="text"
            placeholder='Type New Task...'
            className="inputTask__input"
            onChange={settingText}/>
            <button
            type='submit'
            className="inputTask__button"
            disabled={isDisabled}>
                Add
            </button>
        </form>
    );
}

export default React.memo(InputTask);
