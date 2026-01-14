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

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setError("Title is required");
      return;
    }

    if (trimmedTitle.length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    if (trimmedTitle.length > 50) {
      setError("Title cannot exceed 50 characters");
      return;
    }


    if (trimmedDescription.length > 200) {
      setError("Description cannot exceed 200 characters");
      return;
    }

    onAdd(trimmedTitle, trimmedDescription || undefined);

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
        required
        maxLength={50}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
      />

      <input
        placeholder="Description"
        value={description}
        maxLength={200}
        onChange={(e) => {
          setDescription(e.target.value);
          setError("");
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
