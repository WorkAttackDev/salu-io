import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerErrorV2 } from "../../../shared/lib/server_errors";
import { MyLabel } from "../../../shared/models/MyLabel";
import { ApiResponse } from "../../../shared/types";

const getLabelsController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyLabel[]>>
) => {
  try {
    const labels = await prisma.label.findMany({
      take: 100,
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json({ data: labels, errors: null });
  } catch (error) {
    handleServerErrorV2({
      err: error,
      messages: ["Ocorreu um erro ao buscar labels"],
      res,
      status: 500,
    });
  }
};

export default getLabelsController;
