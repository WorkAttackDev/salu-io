import { TaskTodo } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../client/core/config/prisma";
import { handleServerErrorV2 } from "../../../../shared/lib/server_errors";
import { ApiResponse } from "../../../../shared/types";

export default async function getTaskTodosController(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<TaskTodo[]>>
) {
  const taskId = req.query.id as string;

  try {
    const todos = await prisma.taskTodo.findMany({
      where: {
        taskId: taskId,
      },
    });

    return res.status(200).json({
      data: todos,
      errors: null,
    });
  } catch (e) {
    handleServerErrorV2({
      err: e,
      messages: ["Ocorreu um erro ao buscar as tarefas"],
      status: 500,
      res,
    });
  }
}
