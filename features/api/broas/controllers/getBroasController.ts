import { Broa } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { type BroaSortBy } from "../../../shared/broas.types";
import { handleServerError } from "../../../shared/lib/server_errors";
import { PaginatedApiResponse } from "../../../shared/types";

export const getBroasController = async (
  req: NextApiRequest,
  res: NextApiResponse<PaginatedApiResponse<Broa[]>>
) => {
  const { page, limit, wrongVersion, sortBy = "recent" } = req.query as {
    page?: string;
    limit?: string;
    wrongVersion?: string;
    sortBy?: BroaSortBy;
  };

  const currentPage = Number(page) || 0;
  const perPage = Number(limit) || 20;

  const sortByReactions = sortBy === "smiles" ? "desc" : undefined;
  const sortByDate = sortBy === "recent" ? "desc" : sortBy === "oldest" ? "asc" : undefined;

  try {
    const broas = await prisma.broa.findMany({
      skip: currentPage * perPage,
      take: perPage,
      include: { reactions: true },
      orderBy: { updatedAt: sortByDate , reactions: sortByReactions ?  {_count: sortByReactions} : undefined   },
      where: {
        wrongVersion: {
          contains: wrongVersion,
        },
      },
    });

    const total = !wrongVersion
      ? await prisma.broa.count()
      : await prisma.broa.count({
          where: {
            wrongVersion: {
              contains: wrongVersion,
            },
          },
        });

    res.status(200).json({
      data: broas,
      errors: null,
      pagination: { page: currentPage, limit: perPage, total },
    });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Erro ao carregar os dados"]);
  }
};
