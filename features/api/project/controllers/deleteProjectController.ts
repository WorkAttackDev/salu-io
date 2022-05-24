import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { ApiResponse } from "../../../shared/types";

export const deleteProjectController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  const id = req.query.id as string;

  const { userId } = req.body;

  try {
    await prisma.project.deleteMany({
      where: { id: id, ownerId: userId },
    });

    res.status(200).json({ data: true, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Erro ao deletar projeto"]);
  }
};
