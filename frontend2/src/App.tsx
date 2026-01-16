import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";
import { Toaster } from "react-hot-toast";

import type { Todo } from "./types/Todo";


import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "./api/todoApi";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);



// const titles = todos.map(todo => todo.title);
// const filter = todos.filter(todo=>todo.status==="Completed");
// const find= todos.find(todo=>todo.id==29);
// const sort = [...todos].sort((a,b)=>a.title.localeCompare(b.title));
// const concat = todos.concat([{id:88,title:"New Todo",status:"Pending"}]);  

// console.log("Titles:", titles);
// console.log("Completed Todos:", filter);
// console.log("Todo with ID 29:", find);
// console.log("Sorted Todos by Title:", sort);
// console.log("Concatenated Todos:", concat);


  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const addTodo = async (title: string, description?: string) => {
    let newtodo=await createTodo({ title, description });
    
    setTodos((prev) => [newtodo,...prev, ]);    
  };

  
  const removeTodo = async (id: number) => {
  await deleteTodo(id);



  setTodos(
  
  
    (prev) => prev.filter((todo) => todo.id !== id)
  
  
  );
};



const toggleStatus = async (todo: Todo) => {
  const updatedTodo = await updateTodo(todo.id, {
    status: todo.status === "Pending" ? "Completed" : "Pending",
  });

  setTodos((prev) =>
    prev.map((t) => (t.id === todo.id ? updatedTodo : t)
  )
  );
};


  return (
    <div >
     <h2 className="app-header">To-Do App</h2>
    <Toaster position="top-right" />  
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
