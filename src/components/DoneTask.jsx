import React, { useEffect, useState } from 'react';
import { useTaskStore } from '../stores/store';

const DoneTask = (props) => {

    const removeDoneTask = useTaskStore((state) => state.removeDoneTask)
    
    const remove = () => {
        removeDoneTask(props.data.id)
    }


    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    
    useEffect(()=>{
        setDate(props.data.date.toString().slice(8, 10) + ' ' + props.data.date.toString().slice(4, 7) + ' ' + props.data.date.toString().slice(11, 16))
        setTime(props.data.date.toString().slice(16, 21))
    },[props.data.date])

    return (
        <div className="task">
            <div className="task__body done">
                <div className="task__id done">
                    <div className="task__time done">{time}</div>
                    <div className="task__date done">{date}</div>
                </div>
                <h5 className="task__text done">
                    {props.data.text}
                </h5>
                <svg onClick={remove} className='task__remove done bi bi-trash' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </div>
        </div>
    );
}

export default React.memo(DoneTask);
