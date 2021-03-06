import { TaskTodo } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../client/core/config/prisma";
import { handleServerErrorV2 } from "../../../../shared/lib/server_errors";
import { MyTaskTodoSchema } from "../../../../shared/models/MyTaskTodo";
import { ApiResponse } from "../../../../shared/types";

export default async function upsertTaskTodoController(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<TaskTodo>>
) {
  const data = {
    text: req.body.text,
    taskId: req.query.id,
    todoId: req.body.todoId,
    done: req.body.done,
  };

  try {
    const { taskId, text, todoId, done } = MyTaskTodoSchema.parse({
      ...data,
      taskId: +data.taskId,
    });

    const todo = await prisma.taskTodo.upsert({
      where: {
        id: todoId || randomUUID(),
      },
      update: {
        text,
        done,
      },
      create: {
        text,
        taskId,
      },
    });

    res.status(200).json({
      data: todo,
      errors: null,
    });
  } catch (error) {
    handleServerErrorV2({
      err: error,
      res,
      messages: ["Ocorreu um erro ao editar o todo"],
      status: 500,
    });
  }
}
