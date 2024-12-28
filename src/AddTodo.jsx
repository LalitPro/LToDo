function AddTodo({ handleSaveTodo, setNewTodo, newTodo, setShowAddModal }) {
  return (
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
              className="block w-full px-5 py-2 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
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
  );
}

export default AddTodo;
