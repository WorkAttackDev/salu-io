import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../client/core/config/prisma";
import { handleServerError } from "../../../../shared/lib/server_errors";
import { ApiResponse } from "../../../../shared/types";
import { canUserModifyProject } from "../utils";
export const addParticipantsController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  try {
    const { projectId, participantIds, ownerId } = req.body;

    if (
      isNaN(projectId) ||
      (participantIds as Array<any>).some(isNaN) ||
      isNaN(ownerId)
    ) {
      handleServerError(res, 400, [
        "ID do projeto, participante e dono devem ser números",
      ]);
      return;
    }

    if (!(await canUserModifyProject(res, ownerId, projectId))) return;

    await prisma.projectParticipant.createMany({
      data: participantIds.map((participantId: number) => ({
        projectId: projectId,
        userId: participantId,
      })),
    });

    res.status(201).json({ data: true, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, [
      "Ocorreu um erro ao adicionar o participante",
    ]);
  }
};
