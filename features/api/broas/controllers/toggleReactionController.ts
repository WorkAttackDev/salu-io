import { BroaReaction } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { toggleReactionValidate } from "../../../shared/lib/validation/toggleReactionValidate";
import { ApiResponse } from "../../../shared/types";

export const toggleReactionController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<BroaReaction | null>>
) => {
  const { broaId, userId, reactionId, reactionType } = toggleReactionValidate(
    req.body
  );

  try {
    const broaReaction = !reactionId
      ? await prisma.broaReaction.create({
          data: {
            reactionType,
            broa: { connect: { id: broaId } },
            user: { connect: { id: userId } },
          },
          include: {
            broa: {
              include: { reactions: true },
            },
          },
        })
      : await prisma.broaReaction.delete({ where: { id: reactionId } });

    res
      .status(200)
      .json({ data: reactionId ? null : broaReaction, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Ocorreu um erro ao reagir a broa"]);
  }
};
