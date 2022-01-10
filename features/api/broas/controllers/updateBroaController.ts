import { Broa } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { editBroaValidate } from "../../../shared/lib/validation/edit_broa_validator";
import { ApiResponse } from "../../../shared/types";

export const updateBroaController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Broa>>
) => {
  const { id } = req.query;
  const { wrongVersion, rightVersion, author, userId } = editBroaValidate(
    req.body
  );

  if (isNaN(+id)) {
    handleServerError(res, 400, ["id inválido"]);
    return;
  }

  try {
    const broa = await prisma.broa.findFirst({
      where: { id: +id, AND: { userId } },
      include: { user: true },
    });

    console.log(
      (!broa || broa.userId !== +userId) && broa?.user?.role !== "ADMIN"
    );

    if ((!broa || broa.userId !== +userId) && broa?.user?.role !== "ADMIN") {
      handleServerError(res, 404, ["broa não encontrada"]);
      return;
    }

    const updatedBroa = await prisma.broa.update({
      where: { id: +id },
      data: {
        rightVersion,
        author,
        wrongVersion,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({ data: updatedBroa, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Ocorreu um erro ao editar broa"]);
  }
};
