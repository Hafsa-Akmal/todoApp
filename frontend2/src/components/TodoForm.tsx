import { useState } from "react";
import "./styles/todoForm.css";
interface Props {
  onAdd: (title: string, description?: string) => void;
}

const TodoForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    onAdd(title, description);
    setTitle("");
    setDescription("");
    setError("");
  };

  return (
    <form className="todo-form" onSubmit={submitHandler}>
      <h3>Add Todo</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
