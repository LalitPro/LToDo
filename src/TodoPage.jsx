import React, { useState, useEffect } from 'react';
import Todo from './Todo';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const storedCompletedTodos = localStorage.getItem('completedTodos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    if (storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [todos, completedTodos]);

  const handleAddTodo = (text) => {
    setTodos([...todos, { text, isChecked: false }]);
    setNewTodoText('');
    setIsAddingTodo(false);
  };

  const handleToggleTodo = (index) => {
    const todo = todos[index];
    if (todo.isChecked) {
      setTodos(todos.filter((t, i) => i !== index));
      setCompletedTodos([...completedTodos, todo]);
    } else {
      setCompletedTodos(completedTodos.filter(t => t !== todo));
      setTodos([...todos, todo]);
    }
  };

  const handleAddTodoClick = () => {
    setIsAddingTodo(true);
  };

  const handleCancelClick = () => {
    setIsAddingTodo(false);
    setNewTodoText('');
  };

  return (
    <div className="flex flex-col bg-gray-200 p-4">
      <div className="font-medium text-xl p-4 border-b border-gray-400">YTodo</div>
      <div className="flex flex-col p-4">
        <h1 className="font-bold text-2xl">Things to do</h1>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              isChecked={todo.isChecked}
              setIsChecked={() => handleToggleTodo(index)}
            >
              {todo.text}
            </Todo>
          ))}
        </ul>
        <h1 className="font-bold text-2xl mt-4">Things done</h1>
        <ul>
          {completedTodos.map((todo, index) => (
            <Todo
              key={index}
              isChecked={true}
              setIsChecked={() => {}}
            >
              {todo.text}
            </Todo>
          ))}
        </ul>
        {isAddingTodo ? (
          <div>
            <input
              type="text"
              className="mt-4 p-2 rounded-md border border-gray-400 focus:outline-none"
              placeholder="Add a todo"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleAddTodo();
                }
              }}
            />
            <div className="flex mt-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded" onClick={handleAddTodo}>
                Save
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded" onClick={handleAddTodoClick}>
            Create a todo
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoPage;