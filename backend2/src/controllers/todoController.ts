
import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";


const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(20, "Title must be at most 20 characters"),
  description: z
    .string()
    .trim()
    .max(50, "Description must be at most 50 characters")
    .optional(),
});



const idParamSchema = z.object({
  id: z.coerce.number().int().positive("Invalid ID"),
});

// create
export const createTodo = async (req: Request, res: Response) => {
  try {
    const parsed = createTodoSchema.safeParse(req.body);
    if
     (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }

    const { title, description } = parsed.data;

    const todo = await prisma.todo.create({
      data: { title, description },
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const getTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { id: "desc" },
    });
    
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// update
export const updateTodo = async (req: Request, res: Response) => {
  
  const idParsed = idParamSchema.safeParse(req.params);

  if (!idParsed.success) return res.status(400).json({ error: idParsed.error.issues[0].message });

  let statusRaw = req.body.status;
  const status = statusRaw?.toLowerCase() === "completed" ? "Completed" : "Pending";

  try {
    const todo = await prisma.todo.update({
      where: { id: idParsed.data.id },
      data: { status },
    });
    res.json(todo);
  } catch (err: any) {
    console.error(err);
    if (err.code === "P2025") { // record not found
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(500).json({ error: "Failed to update todo" });
    }
  }
};
//delete
export const deleteTodo = async (req: Request, res: Response) => {
  const parsed = idParamSchema.safeParse(req.params);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  const { id } = parsed.data;

  try {
    await prisma.todo.delete({ where: { id } });
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Todo not found" });
  }
};
