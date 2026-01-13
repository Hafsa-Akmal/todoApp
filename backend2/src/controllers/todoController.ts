import { Request, Response } from "express";
import { pool } from "../db.js";


export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = await pool.query(
      "INSERT INTO todos (title, description) VALUES ($1,$2) RETURNING *",
      [title, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const getTodos = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};


export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  const result = await pool.query(
    "UPDATE todos SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(result.rows[0]);
};


export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
