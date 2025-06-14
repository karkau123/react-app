import "./styles.css";
import { useState } from "react";

export default function App() {
  const [newitem, setNewitem] = useState(""); // new item is the current state while setNewItem is a function used to update the current state
  // state is immutable  i can not directly change its value to chanhe its value i need to use the setNewItem function
  // setNewitem = ("Hi Kartikeya ")   -> This will cause it to go into an infinite loop\

  const [todos, setTodos] = useState([]);
  function handlesubmit(e) {
    e.preventDefault(); // stops my page from refreshing
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newitem, completed: false },
      ];
    });
  }
  function toggleTodo(id , completed)
  {
          setTodos (currentTodos => {
              return currentTodos.map(todo =>  {
                   if (todo.id === id){
                      return {...todo , completed}
                   }
                   return todo
              })
          })
  }
  function deleteTodo (id)
  {
       setTodos(currentTodos =>{
          return currentTodos.filter(todo => todo.id !== id )
       })
  }
  return (
    <>
      <div className="container">
        <form onSubmit={handlesubmit} className="new-item-form">
          <div className="form-row">
            <label htmlFor="item">New Item</label>
            <input
              value={newitem}
              onChange={(e) => setNewitem(e.target.value)}
              type="text"
              id="item"
            />
          </div>
          <button className="btn">ADD</button>
        </form>

        <h1 className="Header">Todo</h1>

        <ul className="list">
          {todos.length === 0 && "No Todos"}
          {todos.map((todo) => {
            return (
              <li key = {todo.id}>
                <label>
                  <input type="checkbox" checked={todo.completed} 
                  onChange={e => {toggleTodo(todo.id , e.target.checked)}} />
                  {todo.title}
                </label>
                <button   onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
