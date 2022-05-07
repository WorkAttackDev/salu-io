import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../client/core/config/prisma";
import { handleServerErrorV2 } from "../../../../shared/lib/server_errors";
import { ApiResponse } from "../../../../shared/types";

export default async function deleteTaskTodoController(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) {
  const { todoId } = req.body;

  try {
    await prisma.taskTodo.delete({
      where: {
        id: todoId as string,
      },
    });

    res.status(200).json({ data: true, errors: null });
  } catch (error) {
    handleServerErrorV2({
      err: error,
      res,
      messages: ["Não foi possível deletar o todo"],
      status: 500,
    });
  }
}
