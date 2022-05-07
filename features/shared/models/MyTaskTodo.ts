import { TaskTodo } from "@prisma/client";
import { z } from "zod";

export const MyTaskTodoSchema = z.object({
  taskId: z.number(),
  text: z.string().max(200).min(3),
  todoId: z.string().optional(),
  done: z.boolean().optional(),
});

export type MyTaskTodoSchemaParams = z.infer<typeof MyTaskTodoSchema>;

export type MyTaskTodo = TaskTodo;
