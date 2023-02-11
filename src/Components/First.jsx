import React, { useEffect, useState } from "react";

const getLocalStorageData = () => {
  let gettingData = localStorage.getItem("todos");
  if (gettingData) {
    return JSON.parse(localStorage.getItem("todos"));
  } else {
    return [];
  }
};
const First = () => {
  const [todos, setTodos] = useState(getLocalStorageData);
  const [newTodo, setNewTodo] = useState("");
  const [toggle, setToggle] = useState(true);
  const [edittodo, setEditTodo] = useState();
  //adding task to todo
  const handleAddTodo = () => {
    if (!newTodo) {
    } else if (newTodo && !toggle) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === edittodo) {
            return { ...todo, name: newTodo };
          }
          return todo;
        })
      );
      setToggle(true);
      setNewTodo("");
      setEditTodo();
    } else {
      let newtododata = { id: new Date().getTime().toString(), name: newTodo };
      setTodos([...todos, newtododata]);
      setNewTodo("");
    }
  };

  //editing task to todo
  const handleEditTodo = (index) => {
    let edittedTodo = todos.find((todo) => {
      return todo.id === index;
    });
    setToggle(false);
    setNewTodo(edittedTodo.name);
    setEditTodo(index);
  };

  //delete the items
  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((todo) => {
      return index !== todo.id;
    });
    setTodos(updatedTodos);
  };

  //setting the task in local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //remove all
  function handleRemoveAll() {
    setTodos([]);
  }
  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Add Todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      {toggle ? (
        <button onClick={handleAddTodo}>Add</button>
      ) : (
        <button onClick={handleAddTodo}>Update</button>
      )}

      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.name}</p>
            <button
              className="border-2 border-red-200"
              onClick={() => {
                handleEditTodo(todo.id);
              }}
            >
              Edit
            </button>

            <button
              onClick={() => {
                handleDeleteTodo(todo.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {!todos && <button onClick={handleRemoveAll}>REMOVE ALL</button>}
    </div>
  );
};
export default First;
