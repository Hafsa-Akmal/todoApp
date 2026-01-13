import type { Todo } from "../types/Todo";
import "./styles/todoList.css";

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
}

const TodoList = ({ todos, onDelete, onToggle }: Props) => {
  // Empty state validation
  if (!todos || todos.length === 0) {
    return <p>No todos available</p>;
  }

  const handleDelete = (id: number) => {
    if (typeof id !== "number" || id < 0) return;
    onDelete(id);
  };

  const handleToggle = (todo: Todo) => {
    if (!todo || typeof todo.id !== "number") return;
    onToggle(todo);
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        const title = todo.title?.trim();
        const description = todo.description?.trim();

        // Skip invalid todo entries
        if (!title) return null;

        return (
          <li key={todo.id}>
            <strong>{title}</strong>

            <span> — {todo.status}</span>

            {description && <span> : {description}</span>}

            <button onClick={() => handleToggle(todo)}>
              Status
            </button>

            <button onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
