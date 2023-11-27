import React from 'react'

function Card({title, deleteTask, i}) {
  return (
    <article>
        <input type="checkbox" name={i} />
        <label htmlFor={i} >{title}</label>
        <button onClick={deleteTask}>Delete Task</button>
    </article>
  )
}

export default Card