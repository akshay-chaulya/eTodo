import { createContext, useContext, useEffect, useReducer } from "react";

const TodoContext = createContext();

const initialState = { todos: [], error: "" };

function reduser(state, action) {
  switch (action.type) {
    case "todos/loaded":
      return { ...state, todos: action.payload };
    case "todo/added":
      return { ...state, todos: [...state.todos, action.payload] };
    case "todo/completed":
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        ],
      };
    case "todo/updated":
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, title: action.payload.title }
              : todo
          ),
        ],
      };
    case "todo/deleted":
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.payload)],
      };
    case "todos/seted":
      return {
        ...state,
      };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknow action type");
  }
}

// eslint-disable-next-line react/prop-types
function TodoProvider({ children }) {
  const [{ todos, error }, dispatch] = useReducer(reduser, initialState);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      dispatch({ type: "todos/loaded", payload: todos });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    const todo = { title: title, completed: false, id: Date.now() };
    dispatch({ type: "todo/added", payload: todo });
  };

  const updateTodo = (id, title) => {
    dispatch({ type: "todo/updated", payload: { id, title } });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "todo/deleted", payload: id });
  };

  const toggoleComplete = (id) => {
    dispatch({ type: "todo/completed", payload: id });
  };

  const setError = (error) => {
    dispatch({ type: "rejected", payload: error });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        error,
        addTodo,
        setError,
        updateTodo,
        deleteTodo,
        toggoleComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined)
    throw new Error("useTodo was using outside of TodoProvider");
  return context;
}

export { TodoProvider, useTodo };
