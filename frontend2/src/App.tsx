import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


import type { Todo } from "./types/Todo";


import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "./api/todoApi";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const addTodo = async (title: string, description?: string) => {
    await createTodo({ title, description });
    loadTodos();
  };

  const removeTodo = async (id: number) => {
    await deleteTodo(id);
    loadTodos();
  };

  const toggleStatus = async (todo: Todo) => {
    await updateTodo(todo.id, {
      status: todo.status === "Pending" ? "Completed" : "Pending",
    });
    loadTodos();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>To-Do App (PERN + TypeScript)</h2>

      <TodoForm onAdd={addTodo} />

      <TodoList
        todos={todos}
        onDelete={removeTodo}
        onToggle={toggleStatus}
      />
    </div>
  );
};

export default App;
