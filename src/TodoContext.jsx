import React, { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

function TodoProvider({ children }) {
  const defaultTodos = [
    { id: 1, text: "Clean my computer", done: false },
    { id: 2, text: "Buy a keyboard", done: false },
  ];

  const [todos, setTodos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(
      localStorage.getItem("todos") || JSON.stringify(defaultTodos)
    );
    if (savedTodos) {
      setTodos(savedTodos);
    } else {
      setTodos(defaultTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSaveTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
      setNewTodo("");
      setShowAddModal(false);
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        handleSaveTodo,
        toggleTodo,
        showAddModal,
        setShowAddModal,
        newTodo,
        setNewTodo,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
