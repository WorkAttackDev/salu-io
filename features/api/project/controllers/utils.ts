import { NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { tryCatch } from "../../../shared/lib/try_catch";

export const canUserModifyProject = async (
  res: NextApiResponse,
  ownerId: string,
  projectId: string
): Promise<boolean> => {
  const [owner, isAllowedError] = await tryCatch(
    prisma.user.findFirst({
      where: {
        OR: [
          {
            id: ownerId,
            Projects: {
              some: {
                id: projectId,
              },
            },
          },
          {
            id: ownerId,
            role: "ADMIN",
          },
        ],
      },
    })
  );

  if (isAllowedError || !owner) {
    handleServerError(res, 403, [
      "Você não tem permissão para modificar este projeto",
    ]);
    return false;
  }

  return true;
};
