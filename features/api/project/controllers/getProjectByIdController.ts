import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { MyProjectTasks } from "../../../shared/models/myProjectTasks";
import { ApiResponse } from "../../../shared/types";

export const getProjectByIdController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyProjectTasks>>
) => {
  const id = req.query.id as string;

  if (isNaN(+id)) {
    handleServerError(res, 400, ["id inválido"]);
    return;
  }

  try {
    const project = await prisma.project.findUnique({
      include: {
        tasks: true,
      },
      where: { id: parseInt(id) },
    });

    if (!project) {
      handleServerError(res, 400, ["projeto não encontrado"]);
      return;
    }

    res.status(200).json({ data: project as MyProjectTasks, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Erro ao carregar os dados"]);
  }
};
