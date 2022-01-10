import { Broa } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { ApiResponse } from "../../../shared/types";

export const getBroaByIdController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Broa>>
) => {
  const id = req.query.id as string;

  if (isNaN(+id)) {
    handleServerError(res, 400, ["id inválido"]);
    return;
  }

  try {
    const broa = await prisma.broa.findUnique({ where: { id: parseInt(id) } });

    if (!broa) {
      handleServerError(res, 400, ["broa não encontrada"]);
      return;
    }

    res.status(200).json({ data: broa, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Erro ao carregar os dados"]);
  }
};
