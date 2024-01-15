import logo from './logo.svg';
import './App.css';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import getApiData from "./features/todo/getApiData";
function App() {
  return (
    <div className="App">
      Redux app
      
      <AddTodo/>
      <Todos/>
    </div>
  );
}

export default App;
