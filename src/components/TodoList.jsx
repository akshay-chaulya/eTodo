import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import Todo from "./Todo";

function TodoList() {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const { todos } = useTodo();
  return (
    <div className="w-[50%] h-[60%] bg-gray-800 flex flex-col gap-3 items-center rounded-md overflow-hidden p-4 overflow-y-scroll no-scrollbar">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          isEditing={editingTodoId == todo.id}
          setEditingTodoId={setEditingTodoId}
        />
      ))}
    </div>
  );
}

export default TodoList;
