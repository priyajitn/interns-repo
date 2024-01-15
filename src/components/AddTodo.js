import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addTodo,setTodo } from '../features/todo/todoSlice'
import getApiData from '../features/todo/getApiData'

function AddTodo() {
    const [input,setInput] = useState("");
    const  dispatch = useDispatch()
    useEffect(()=>{
      const fetData=async()=>{
        try{

          const data = await getApiData();
          dispatch(setTodo(data));
          console.log({data});
        }
        catch(e){
          console.error('error fetching')
        }
      }
      fetData();
    },[dispatch])
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