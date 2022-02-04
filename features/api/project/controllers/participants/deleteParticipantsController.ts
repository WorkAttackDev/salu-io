import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../client/core/config/prisma";
import { handleServerError } from "../../../../shared/lib/server_errors";
import { ApiResponse } from "../../../../shared/types";
import { canUserModifyProject } from "../utils";

export const deleteParticipantsController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  try {
    const { projectId, participantIds, ownerId } = req.body as {
      projectId: string;
      participantIds: Array<string>;
      ownerId: string;
    };

    if (
      isNaN(+projectId) ||
      (participantIds as Array<any>).some(isNaN) ||
      isNaN(+ownerId)
    ) {
      handleServerError(res, 400, [
        "ID do projeto, participante e dono devem ser números",
      ]);
      return;
    }

    if (!(await canUserModifyProject(res, +ownerId, +projectId))) return;

    await prisma.projectParticipant.deleteMany({
      where: {
        user: {
          id: {
            in: participantIds.map((id) => +id),
          },
        },
        project: {
          id: +projectId,
        },
      },
    });

    res.status(200).json({ data: true, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Ocorreu um erro ao excluir o participantes"]);
  }
};
