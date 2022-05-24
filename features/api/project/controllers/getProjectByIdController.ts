import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { MyProject } from "../../../shared/models/myProjectTasks";
import { ApiResponse } from "../../../shared/types";

export const getProjectByIdController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyProject>>
) => {
  const id = req.query.id as string;

  try {
    const project = await prisma.project.findUnique({
      include: {
        tasks: {
          include: { labels: true },
        },
        participants: {
          include: {
            user: {
              select: { email: true, name: true, id: true },
            },
          },
        },
      },
      where: { id: id },
    });

    if (!project) {
      handleServerError(res, 400, ["projeto não encontrado"]);
      return;
    }

    res.status(200).json({ data: project as MyProject, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Erro ao carregar os dados"]);
  }
};
