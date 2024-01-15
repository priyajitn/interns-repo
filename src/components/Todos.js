import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'

function Todos() {
    const todos=useSelector(state=>state.todos)
    const  dispatch = useDispatch()

  return (
    <>
    <div>Todos</div>
    {todos.todos && todos.todos.map((todo)=>(
        <li key={todo.id}>
            {todo.todo}
            <button onClick={()=>dispatch(removeTodo(todo.id))}>Remove</button>
        </li>
    ))}
    </>
  )
}

export default Todos