import React, { useEffect, useRef, useState } from 'react';
import { useTaskStore } from '../stores/store';
import '../styles/task.scss';
import ChangeTask from './ChangeTask';


const Task = (props) => {

    const removeTask = useTaskStore((state) => state.removeTask)
    const executeTask = useTaskStore((state) => state.executeTask)

    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [done, setDone] = useState('') 
    const [changeTask, setChangeTask] = useState(false)

    const isChecked = useRef(null)
    const isDone = () => {
        if (isChecked.current.checked === true){
            setDone('processing')
            setTimeout(()=>{
                executeTask(props.data.id)
                isChecked.current.checked = false
                setDone('')
            },1000)
        }
    }


    const showChangeTask = () => {
        setChangeTask(true)
    }
    const hideChangeTask = () => {
        setChangeTask(false)
    }
   

    const removeTaskClick = () => {
        removeTask(props.data.id)
    }
    useEffect(()=>{
        setDate(props.data.date.toString().slice(8, 10) + ' ' + props.data.date.toString().slice(4, 7) + ' ' + props.data.date.toString().slice(11, 16))
        setTime(props.data.date.toString().slice(16, 21))
    },[props.data.date])

    

    return (
        <>
        <div className="task">
            <div className="task__body">
                <input
                ref={isChecked}
                type='checkbox'
                className="task__isDone"
                onClick={isDone}/>
                <div className="task__id">
                    <div className="task__time">{time}</div>
                    <div className="task__date">{date}</div>
                </div>
                <h5 className={"task__text "+done}>
                    {props.data.text}
                </h5>
                <svg onClick={showChangeTask} className='task__change bi bi-pencil-fill' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
                <svg onClick={removeTaskClick} className='task__remove bi bi-trash ' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </div>
        </div>
        {<ChangeTask
        show={changeTask}
        hide={hideChangeTask}
        id={props.data.id}
        />}
        </>
    );
}

export default React.memo(Task);
