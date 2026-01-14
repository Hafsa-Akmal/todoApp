import type { Todo } from "../types/Todo";
import "./styles/todoList.css";

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
}

const TodoList = ({ todos, onDelete, onToggle }: Props) => {
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
    <table className="todo-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th className="actions">Actions</th>
        </tr>
      </thead>

      <tbody>
        {todos.map((todo) => {
          const title = todo.title?.trim();
          const description = todo.description?.trim();

          if (!title) return null;

          return (
            <tr key={todo.id} className={todo.status === "Completed" ? "completed" : ""}>
              <td>{title}</td>
              <td>{description || "-"}</td>
              <td>{todo.status}</td>
              <td className="actions">
                <button className="btn btn-edit" onClick={() => handleToggle(todo)}>
                  Toggle Status
                </button>
                <button className="btn btn-delete" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TodoList;
