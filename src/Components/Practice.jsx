import React, { useEffect, useState } from "react";
const gettingdata = () => {
  let getLocalStorage = localStorage.getItem("todos");
  if (getLocalStorage) {
    return JSON.parse(localStorage.getItem("todos"));
  } else {
    return [];
  }
};

function Practice() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, settodos] = useState(gettingdata());
  const [toggel, setToggel] = useState(true);
  const [editTodo, setEditTodo] = useState();

  //add
  const handleAdd = () => {
    if (!newTodo) {
      alert("please enter a task!!");
    } else if (newTodo && !toggel) {
      settodos(
        todos.map((todo) => {
          if (todo.id === editTodo) {
            return { ...todos, name: newTodo };
          }
          return todo;
        })
      );
      setEditTodo();
      setNewTodo("");
      setToggel(true);
    } else {
      let todoinfo = { id: new Date().getTime().toString(), name: newTodo };
      settodos([...todos, todoinfo]);
      setNewTodo("");
    }
  };

  //edit
  const handleEdit = (index) => {
    todos.find((todo) => {
      let edittedTodo = todo.id === index;
      setEditTodo(index);
      setNewTodo(edittedTodo.name);
      setToggel(false);
    });
  };

  //Delete
  const handleDelete = (index) => {
    let updatedTodo = todos.filter((todo) => {
      return todo.id !== index;
    });
    settodos(updatedTodo);
  };

  //setdata
  useEffect = () => {
    localStorage.setItem("todos", JSON.stringify(todos)), [todos];
  };

  return (
    <div>
      <div>
        <h1>ToDo-List</h1>
        <input
          className="border-2  p-4 border-stale-400"
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          placeholder="Add Task...."
          value={newTodo}
        ></input>
        {toggel ? (
          <button className="border-2  p-4 border-gray-400" onClick={handleAdd}>
            Add
          </button>
        ) : (
          <button className="border-2  p-4 border-gray-400" onClick={handleAdd}>
            Update
          </button>
        )}
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <h1>{todo.name}</h1>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleEdit(todo.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Practice;
