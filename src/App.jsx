import React from "react";
import TodoApp from "./TodoApp";
import TodoProvider from "./TodoContext";

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;
