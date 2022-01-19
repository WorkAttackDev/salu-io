import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { ApiResponse } from "../../../shared/types";

export const deleteTaskByIdController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  const id = req.query.id;

  if (isNaN(+id)) {
    handleServerError(res, 400, ["id inválido"]);
    return;
  }

  try {
    await prisma.task.delete({
      where: {
        id: +id,
      },
    });

    res.status(200).json({ errors: null, data: true });
  } catch (error) {
    handleServerError(res, 500, ["Erro ao apagar a tarefa"]);
  }
};
