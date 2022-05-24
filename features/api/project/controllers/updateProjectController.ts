import { Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { editProjectValidate } from "../../../shared/lib/validation/editProjectValidator";
import { ApiResponse } from "../../../shared/types";

export const updateProjectController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Project>>
) => {
  const id = req.query.id as string;
  const { description, endDate, name, ownerId, startDate, status } =
    editProjectValidate(req.body);

  try {
    const project = await prisma.project.findFirst({
      where: { id: id, AND: { ownerId: ownerId } },
    });

    if (!project) {
      handleServerError(res, 404, ["Projeto não encontrado"]);
      return;
    }

    const updatedProject = await prisma.project.update({
      where: { id: id },
      data: {
        description: description || undefined,
        endDate: endDate ? new Date(endDate) : null,
        name,
        startDate: startDate ? new Date(startDate) : new Date(),
        status,
      },
    });

    res.status(200).json({ data: updatedProject, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["Ocorreu um erro ao editar Project"]);
  }
};
