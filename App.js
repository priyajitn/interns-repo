import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, toggleTodo } from './features/todosSlice';
import './index.css';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.list);

  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    dispatch(addTodo({
      id: Date.now(),
      text: newTodo,
      completed: false,
    }));
    setNewTodo('');
  };

  return (
    <div>
      <h1>Redux Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
