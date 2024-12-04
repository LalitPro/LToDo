import React, { useState, useEffect } from "react";

function TodoApp() {
  const defaultTodos = [
    { id: 1, text: "Clean my computer", done: false },
    { id: 2, text: "Buy a keyboard", done: false },
  ];

  const [todos, setTodos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  // Load todos from localStorage or use defaults
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    } else {
      setTodos(defaultTodos); // Set default todos on first load
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const handleSaveTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
      setNewTodo("");
      setShowAddModal(false);
    }
  };

  // Toggle the completion status of a todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <p className="text-xl font-medium leading-6 text-gray-900 sm:truncate">
              LTodo
            </p>
          </div>
        </div>
      </nav>
      <div className="py-10">
        <div className="mx-auto max-w-7xl">
          <header>
            <div className="px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">
                  Things to get done
                </h1>
              </div>
            </div>
          </header>
          <main>
            <div className="transition-opacity duration-200 sm:px-6 lg:px-8">
              <div className="px-4 py-8 space-y-8 sm:px-0">
                {/* Things to Do Section */}
                <fieldset className="grid grid-cols-1">
                  <legend className="text-lg font-medium leading-6 text-gray-900">
                    Things to do
                  </legend>
                  <ul className="mt-4 space-y-2">
                    {todos.filter((todo) => !todo.done).length === 0 ? (
                      <p className="text-sm text-gray-500">No todos here!</p>
                    ) : (
                      todos
                        .filter((todo) => !todo.done)
                        .map((todo) => (
                          <li
                            key={todo.id}
                            className="relative flex items-start"
                          >
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={() => toggleTodo(todo.id)}
                                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <span className="font-medium text-gray-700">
                                {todo.text}
                              </span>
                            </div>
                          </li>
                        ))
                    )}
                  </ul>
                </fieldset>
                <button
                  onClick={() => setShowAddModal(true)}
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-yellow-500 border border-transparent rounded-full shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="-ml-0.5 mr-2 h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add a todo
                </button>
                {/* Things Done Section */}
                <fieldset className="grid grid-cols-1">
                  <legend className="text-lg font-medium leading-6 text-gray-900">
                    Things done
                  </legend>
                  <ul className="mt-4 space-y-2">
                    {todos.filter((todo) => todo.done).length === 0 ? (
                      <p className="text-sm text-gray-500">No todos here!</p>
                    ) : (
                      todos
                        .filter((todo) => todo.done)
                        .map((todo) => (
                          <li
                            key={todo.id}
                            className="relative flex items-start"
                          >
                            <div className="flex items-center h-5"></div>
                            <div className="ml-3 text-sm">
                              <span className="font-medium text-gray-700 line-through">
                                {todo.text}
                              </span>
                            </div>
                          </li>
                        ))
                    )}
                  </ul>
                </fieldset>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add Todo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Create a todo
            </h3>
            <form className="mt-5" onSubmit={handleSaveTodo}>
              <div className="w-full sm:max-w-xs">
                <label htmlFor="new-todo" className="sr-only">
                  New Todo
                </label>
                <input
                  id="new-todo"
                  type="text"
                  name="new-todo"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="Write Your Task Here"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
              </div>
              <div className="flex justify-start pt-5">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 ml-3 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoApp;
