import { createSlice, nanoid } from "@reduxjs/toolkit";




const todoSlice= createSlice({
    name: 'todos',
    initialState:{
        todos:[
            {id:0,todo:"hello",completed:true,userId:12}
        ],
    },
    reducers:{
        setTodo: (state,action)=>{
           // console.log(action)
           state.todos= action.payload
        },
        addTodo: (state,action)=>{
            const newTd={todo:action.payload,id:nanoid(),completed:false,userId:11};
            state.todos.push(newTd)
         }
        ,
        removeTodo: (state,action)=>{
            state.todos = state.todos.filter((t)=>
            t.id !== action.payload)
        },
    }
})

export const {addTodo,setTodo,removeTodo}= todoSlice.actions
export default todoSlice.reducer