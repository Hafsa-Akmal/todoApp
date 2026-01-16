
import { useState } from "react";
import "./styles/todoForm.css";
import toast from 'react-hot-toast';


interface Props {
  onAdd: (title: string, description?: string) => Promise<void>;
}


const TodoForm = ({ onAdd }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(); //task1 :types declare
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const submitHandler = async(e: React.FormEvent) => {
    e.preventDefault(); // task2 : check without this.

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    // if (!trimmedTitle) {
    //   setError("Title is required");
    //  return // task 3 : remove return behaviour
    // }

    // if (trimmedTitle.length < 3) {
    //   setError("Title must be at least 3 characters");
    //   return;
    // }

    // if (trimmedTitle.length > 20) {
    //   setError("Title cannot exceed 20 characters");
    //   return;
    // }
    //    if (trimmedDescription.length > 50) {
    //   setError("Description cannot exceed 50 characters");
    //   return;
    // }

     try {
      await
    onAdd(trimmedTitle, trimmedDescription );
    setTitle("");
    setDescription("");
    setError("");
    setShowModal(false);
      toast.success("Todo added successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <>
   
      <button className="add-todo-btn" onClick={() => setShowModal(true)}>Add Todo</button>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <form className="todo-form" onSubmit={submitHandler}>
              <h3 key={'addtodoheading'}>Add Todo</h3>

              <input
                placeholder="Title"
                value={title}
               
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
              />

              <input
                placeholder="Description"
                value={description}
               
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError("");
                }}
              />

              {error && <p style={{ color: "red" }}>{error}</p>}

              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoForm;
