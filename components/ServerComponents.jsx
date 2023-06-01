import React from 'react'
import { TodoButton } from './Clients'

 export const ToDoItems= ({title,descrption,id,completed}) => {
  return (
    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{descrption}</p>
        </div>
        <div>
            <TodoButton id={id} completed={completed} />
        </div>
    </div>
  )
}

