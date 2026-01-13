
import type { Todo } from "../types/Todo";

import "./styles/todoList.css";

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
}

const TodoList = ({ todos, onDelete, onToggle }: Props) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <strong>{todo.title}</strong> {todo.status} {todo.description && `: ${todo.description}`}

          <button onClick={() => onToggle(todo)}>
             Status
          </button>

          <button onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
