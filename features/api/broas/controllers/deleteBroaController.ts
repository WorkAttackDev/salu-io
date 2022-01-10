import { Broa } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { ApiResponse } from "../../../shared/types";

export const deleteBroaController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  const id = req.query.id as string;

  const { userId } = req.body;

  if (isNaN(+id)) {
    handleServerError(res, 400, ["id inválido"]);
    return;
  }

  try {
    const broa = await prisma.broa.findUnique({
      where: { id: +id },
      include: { user: true },
    });

    if ((!broa || broa.userId !== +userId) && broa?.user?.role !== "ADMIN") {
      handleServerError(res, 404, ["broa não encontrada"]);
      return;
    }

    await prisma.broa.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ data: true, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Erro ao carregar os dados"]);
  }
};
