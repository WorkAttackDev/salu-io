import { Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { handleServerError } from "../../shared/lib/server_errors";
import { PaginatedApiResponse } from "../../shared/types";

export const getProjectsController = async (
  req: NextApiRequest,
  res: NextApiResponse<PaginatedApiResponse<Project[]>>
) => {
  const {
    page,
    limit,
    name,
    sortBy = "recent",
  } = req.query as {
    page?: string;
    limit?: string;
    name?: string;
    sortBy?: string;
  };

  const currentPage = Number(page) || 0;
  const perPage = Number(limit) || 20;

  const sortByDate =
    sortBy === "recent" ? "desc" : sortBy === "oldest" ? "asc" : undefined;

  try {
    const projects = await prisma.project.findMany({
      skip: currentPage * perPage,
      take: perPage,
      include: { reactions: true },
      orderBy: { updatedAt: sortByDate },
      where: {
        name: {
          contains: name,
        },
      },
    });

    const total = !name
      ? await prisma.broa.count()
      : await prisma.broa.count({
          where: {
            wrongVersion: {
              contains: name,
            },
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
