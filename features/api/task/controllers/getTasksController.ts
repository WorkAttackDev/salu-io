import { Task } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { PaginatedApiResponse } from "../../../shared/types";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";

export const getTasksController = async (
  req: NextApiRequest,
  res: NextApiResponse<PaginatedApiResponse<Task[]>>
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
    const projects = await prisma.task.findMany({
      skip: currentPage * perPage,
      take: perPage,
      include: { labels: true },
      orderBy: { updatedAt: sortByDate },
      where: {
        name: {
          contains: name,
        },
      },
    });

    const total = !name
      ? await prisma.task.count()
      : await prisma.task.count({
          where: {
            name: {
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
