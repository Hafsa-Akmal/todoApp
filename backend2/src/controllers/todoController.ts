import { Request, Response } from "express";
import { pool } from "../db.js";
import { z } from "zod";


const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(50, "Title must be at most 50 characters"),
  description: z
    .string()
    .trim()
    .max(200, "Description must be at most 200 characters")
    .optional(),
});

const updateTodoSchema = z.object({
  status: z.enum(["pending", "completed"]),
});

const idParamSchema = z.object({
  id: z.coerce.number().int().positive("Invalid ID"),
});



export const createTodo = async (req: Request, res: Response) => {
  try {
    const parsed = createTodoSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues[0].message,
      });
    }

    const { title, description } = parsed.data;

    const result = await pool.query(
      "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const getTodos = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM todos ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const idParsed = idParamSchema.safeParse(req.params);
  const bodyParsed = updateTodoSchema.safeParse(req.body);

  if (!idParsed.success) {
    return res.status(400).json({
      error: idParsed.error.issues[0].message,
    });
  }

  if (!bodyParsed.success) {
    return res.status(400).json({
      error: bodyParsed.error.issues[0].message,
    });
  }

  const { id } = idParsed.data;
  const { status } = bodyParsed.data;

  try {
    const result = await pool.query(
      "UPDATE todos SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const parsed = idParamSchema.safeParse(req.params);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues[0].message,
      });
    }

    const { id } = parsed.data;

    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
