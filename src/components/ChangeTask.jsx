import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../stores/store';
import '../styles/changeTask.scss';

const ChangeTask = (props) => {

    const changeTask = useTaskStore((state) => state.changeTask)
    const [newText, setNewText] = useState('')

    const tasks = useTaskStore((state) => state.tasks)
    useEffect(() => {
        tasks.forEach(item => {
            if (item.id === props.id) setNewText(item.text)
        })
    }, [tasks]);

    const settingNewText = (Event) => {
        setNewText(Event.target.value)
    }
    const setChanges = () => {
        if (newText.length === 0) {
            tasks.forEach(item => {
                if (item.id === props.id) setNewText(item.text)
            })
            props.hide()
        } else {
            changeTask(props.id, newText)
            props.hide()
        }
    }
    const close = () => {
        if (newText.length === 0) {
            tasks.forEach(item => {
                if (item.id === props.id) setNewText(item.text)
            })
            props.hide()
        } else {
            props.hide()
        }
    }

    const hudleSubmit = (Event) => {
        Event.preventDefault()
        setChanges()
    }

    if (props.show) {
        return (
            <div className='changeTask'>
                <div className="changeTask__body">
                    <h5 className="changeTask__title">Change Your Task</h5>
                    <form onSubmit={hudleSubmit} className="changeTask__form">
                        <input
                        placeholder='Type New Text...'
                        value={newText}
                        type="text" className="changeTask__input"
                        onChange={settingNewText}/>
                        <button className="changeTask__change" onClick={setChanges}>Set New Text</button>
                    </form>
                    <div onClick={close} className="changeTask__close">
                        <div className="changeTask__close-item"></div>
                        <div className="changeTask__close-item"></div>
                    </div>
                </div>
            </div>
        );
    } else {
        return 
    }

    
}

export default React.memo(ChangeTask);
