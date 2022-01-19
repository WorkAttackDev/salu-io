import { Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import {
  handleServerError,
  handleServerValidationError,
} from "../../../shared/lib/server_errors";
import { editProjectValidate } from "../../../shared/lib/validation/editProjectValidator";
import { ApiResponse } from "../../../shared/types";

export const createProjectController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Project>>
) => {
  try {
    const { description, endDate, name, ownerId, status, startDate } =
      editProjectValidate(req.body);

    try {
      const newProject = await prisma.project.create({
        data: {
          description,
          endDate: new Date(endDate),
          name,
          owner: {
            connect: {
              id: ownerId,
            },
          },
          status,
          startDate: startDate ? new Date(startDate) : new Date(),
        },
      });

      res.status(201).json({ data: newProject, errors: null });
    } catch (error) {
      console.log(error);
      handleServerError(res, 500, ["Ocorreu um erro a cria o projeto"]);
    }
  } catch (err) {
    handleServerValidationError(res, 400, err);
    return;
  }
};
