
import type { Todo } from "../types/Todo";


const API_URL = import.meta.env.VITE_API_URL as string;

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createTodo = async (todo: {
  title: string;
  description?: string;
}) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
const data =await res.json();
if (!res.ok) {                      
  throw new Error(data.error || "Failed to create todo");  
}

return data;   
};

export const updateTodo = async (id: number, todo: Partial<Todo>) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const deleteTodo = async (id: number) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
