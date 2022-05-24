import { Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { PaginatedApiResponse } from "../../../shared/types";

export const getProjectsController = async (
  req: NextApiRequest,
  res: NextApiResponse<PaginatedApiResponse<Project[]>>
) => {
  const {
    page,
    limit,
    name,
    sortBy = "recent",
    userId,
  } = req.query as {
    page?: string;
    limit?: string;
    name?: string;
    sortBy?: string;
    userId?: string;
  };

  if (!userId) {
    return handleServerError(res, 400, [
      "Não foi possível encontrar o usuário",
    ]);
  }

  const currentPage = Number(page) || 0;
  const perPage = Number(limit) || 20;

  const sortByDate =
    sortBy === "recent" ? "desc" : sortBy === "oldest" ? "asc" : undefined;

  try {
    const projects = await prisma.project.findMany({
      skip: currentPage * perPage,
      take: perPage,
      orderBy: { updatedAt: sortByDate },
      where: {
        OR: [
          { ownerId: userId },
          { participants: { some: { userId: userId } } },
        ],
        AND: name ? { name: { contains: name } } : undefined,
      },
    });

    const total = await prisma.project.count({
      where: {
        OR: [
          { ownerId: userId },
          { participants: { some: { userId: userId } } },
        ],
        AND: name ? { name: { contains: name } } : undefined,
      },
    });

    res.status(200).json({
      data: projects,
      errors: null,
      pagination: { page: currentPage, limit: perPage, total },
    });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Erro ao carregar os dados"]);
  }
};
