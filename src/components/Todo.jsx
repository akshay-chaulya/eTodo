import { useRef, useState } from "react";
import { useTodo } from "../context/TodoContext";

// eslint-disable-next-line react/prop-types
function Todo({ todo: { title, id, completed }, isEditing, setEditingTodoId }) {
  const [inputValue, setInputValue] = useState(title);
  const inputFiled = useRef(null);
  const { toggoleComplete, updateTodo, deleteTodo } = useTodo();

  const handleEdit = () => {
    setEditingTodoId(id);
    inputFiled.current.removeAttribute("readonly", "readonly");
    inputFiled.current.focus();
    if (!isEditing) return;
    updateTodo(id, inputValue);
    setEditingTodoId(null);
    inputFiled.current.setAttribute("readonly", "readonly");
  };

  return (
    <div
      className={`${
        isEditing ? "bg-green-100" : ""
      } min-h-[50px] w-full rounded-lg bg-orange-100 flex items-center justify-between px-4`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={completed}
        onChange={() => {
          toggoleComplete(id);
          if (!completed) setEditingTodoId(null);
        }}
      />
      <input
        type="text"
        readOnly
        ref={inputFiled}
        className={` ${
          completed ? "line-through" : ""
        } w-[60%] mr-10 outline-none border-none text-black font-medium bg-inherit flex items-center p-0 text-start`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        disabled={completed}
        className="ml-20 text-xl todo-btn"
        onClick={handleEdit}
      >
        {isEditing ? "🧾" : "✏️"}
      </button>
      <button onClick={() => deleteTodo(id)} className="text-lg todo-btn">
        ❌
      </button>
    </div>
  );
}

export default Todo;
