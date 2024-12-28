import React, { useContext } from "react";
import { TodoContext } from "./TodoContext";
import { IoMdAdd } from "react-icons/io";
import Todo from "./TODO";
import AddTodo from "./AddTodo";

function TodoApp() {
  const {
    todos,
    handleSaveTodo,
    toggleTodo,
    showAddModal,
    setShowAddModal,
    newTodo,
    setNewTodo,
    removeTodo,
  } = useContext(TodoContext);

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

                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Things to do
                </h2>

                {todos &&
                todos.filter((todo) => (!todo.done ? true : false)).length ===
                  0 ? (
                  <p className="text-sm text-gray-500">No todos here!</p>
                ) : (
                  todos
                    .filter((todo) => !todo.done)
                    .map((todo) => (
                      <Todo
                        key={todo.id}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                        todo={todo}
                      />
                    ))
                )}

                <button
                  onClick={() => setShowAddModal(true)}
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-yellow-500 border border-transparent rounded-full shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <IoMdAdd />
                  Add a todo
                </button>
                {/* Things Done Section */}

                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Things done
                </h2>

                {todos && todos.filter((todo) => todo.done).length === 0 ? (
                  <p className="text-sm text-gray-500">No todos here!</p>
                ) : (
                  todos
                    .filter((todo) => todo.done)
                    .map((todo) => (
                      <Todo
                        key={todo.id}
                        removeTodo={removeTodo}
                        toggleTodo={toggleTodo}
                        todo={todo}
                      />
                    ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add Todo Modal */}
      {showAddModal && (
        <AddTodo
          handleSaveTodo={handleSaveTodo}
          setNewTodo={setNewTodo}
          setShowAddModal={setShowAddModal}
          newTodo={newTodo}
        />
      )}
    </div>
  );
}

export default TodoApp;
