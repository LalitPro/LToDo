import { MdOutlineDelete } from "react-icons/md";

function Todo({ todo, toggleTodo, removeTodo }) {
  console.log("todo.done", todo.done);
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={todo.id}
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleTodo(todo.id)}
          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
        />
      </div>
      <div className="ml-3 text-sm">
        {todo.done ? (
          <div className="flex items-center gap-2">
            <MdOutlineDelete
              onClick={() => {
                removeTodo(todo.id);
              }}
              className="text-lg"
            />
            <label htmlFor={todo.id} className="font-medium text-gray-700">
              {todo.text}
            </label>
          </div>
        ) : (
          <label htmlFor={todo.id} className="font-medium text-gray-700">
            {todo.text}
          </label>
        )}
      </div>
    </div>
  );
}

export default Todo;
