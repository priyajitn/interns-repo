import axios from 'axios';
import { addTodo } from './todoSlice'
import store from '../../app/store'

  
 const getApiData=async()=> {
         const res =await axios.get("https://dummyjson.com/todos");
         const myData= res.data;
         console.log(myData.todos)
         return myData.todos;

  }
  
  export default getApiData
 
