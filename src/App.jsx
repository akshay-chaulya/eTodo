import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col gap-10 items-center justify-center text-white">
      <h1 className="font-medium text-3xl">Manage Your Todos</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;
