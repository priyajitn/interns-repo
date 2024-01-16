// src/components/Todos.js
import { MdDeleteForever } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo } from '../redux/todoSlice';
import axios from 'axios';

function Todos() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  //const [showData, setShowData] = useState(true);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/todos");
      const data = res.data.todos;
      data.forEach(index => dispatch(addTodo({
        id: index.id,
        title: index.todo,
        completed: index.completed,
        userId: index.userId,
      })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleShowData = () => {
  //   setShowData(!showData);
  // };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddText = () => {
    if (inputText.trim() === '') {
      // Do not add empty todos
      return;
    }
    // For demonstration, you can add the entered text as a new "todo"
    dispatch(addTodo({
      id: todos.length + 1, // Adjust the logic based on your actual data
      title: inputText,
      completed: false,
      userId: 1, // Set a default userId or adjust as needed
    }));

    // Clear the input field
    setInputText('');
  };

  return (
    <>
      <div>Todos</div>
      {/* <button onClick={handleShowData}>Show Data</button> */}
      <br/>
      <div>
        <input type="text" value={inputText} onChange={handleInputChange} placeholder='Enter your todo...'/>
        <br /><br />
        <button onClick={handleAddText}>Add Todo</button>
      </div>
      <br/><br/>
      <div className="list-none">
        {todos.map((t) => (
          <div key={t.id}>
            <input type="checkbox" name="checkbox1" checked={t.completed} id={t.id} />
            <label htmlFor="checkbox1">{t.title}</label>
            <MdDeleteForever color="red" onClick={() => dispatch(removeTodo(t.id))} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Todos;
