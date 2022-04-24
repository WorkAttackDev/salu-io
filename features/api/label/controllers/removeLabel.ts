import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerErrorV2 } from "../../../shared/lib/server_errors";
import { removeLabelValidate } from "../../../shared/lib/validation/label/removeLabel";
import { ApiResponse } from "../../../shared/types";

const removeLabelController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  try {
    const { id, taskId } = removeLabelValidate(req.body);

    await prisma.label.update({
      where: { id },
      data: {
        tasks: { disconnect: { id: taskId } },
      },
    });

    res.status(200).json({ data: true, errors: null });
  } catch (error) {
    handleServerErrorV2({
      err: error,
      messages: ["Ocorreu um erro ao remover label"],
      res,
      status: 500,
    });
  }
};

export default removeLabelController;
