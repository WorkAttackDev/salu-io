import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerErrorV2 } from "../../../shared/lib/server_errors";
import { deleteLabelValidate } from "../../../shared/lib/validation/label/deleteLabel";
import { ApiResponse } from "../../../shared/types";

const deleteLabelController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  try {
    const { id } = deleteLabelValidate(req.body);

    await prisma.label.delete({
      where: { id },
    });

    res.status(200).json({ data: true, errors: null });
  } catch (error) {
    handleServerErrorV2({
      err: error,
      messages: ["Ocorreu um erro ao apagar label"],
      res,
      status: 500,
    });
  }
};

export default deleteLabelController;
