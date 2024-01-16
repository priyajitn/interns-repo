import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './redux/todoSlice';
import Todos from './components/Todos';
import './App.css'
const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Todos />
      </div>
    </Provider>
  );
}

export default App;