import { useState } from "react";
import { useTodo } from "../context/TodoContext";

function AddTodoForm() {
  const [text, setText] = useState("");
  const { addTodo, setError } = useTodo();

  function handleSubmit(e) {
    e.preventDefault();
    if (text == "") {
      setError("Please filled the input");
      return;
    }
    addTodo(text);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[40%] bg-white flex justify-between rounded-md overflow-hidden"
    >
      <input
        className="w-full outline-none border-none px-[10px] py-[5px] text-black text-lg font-medium"
        type="text"
        placeholder="Create a todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="p-[10px] py-[8px] text-lg bg-green-600 text-white font-medium">
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
