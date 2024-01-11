import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'
function AddTodo() {
    const [input,setInput] = useState("");
    const  dispatch = useDispatch()

  const addTodohandler = (event) => {
    event.preventDefault();
    dispatch(addTodo(input));
    setInput('');
  }
  return (
    <div>
        <form onSubmit={addTodohandler}>
      <label>Type something:
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
    </div>
  )
}

export default AddTodo