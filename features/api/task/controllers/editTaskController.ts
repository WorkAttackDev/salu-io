import { Task } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import {
  handleServerError,
  handleServerValidationError,
} from "../../../shared/lib/server_errors";
import { editTaskValidate } from "../../../shared/lib/validation/editTaskValidator";
import { ApiResponse } from "../../../shared/types";

export const editTaskController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Task>>
) => {
  try {
    const { id, description, endDate, name, projectId, status, startDate } =
      editTaskValidate(req.body);

    const taskData = {
      description,
      endDate: endDate ? new Date(endDate) : null,
      name,
      project: {
        connect: {
          id: projectId,
        },
      },
      status,
      startDate: startDate ? new Date(startDate) : new Date(),
    };

    try {
      if (!id) {
        const newTask = await prisma.task.create({
          data: taskData,
        });

        res.status(201).json({ data: newTask, errors: null });
        return;
      }

      const updatedTask = await prisma.task.update({
        where: {
          id: id,
        },
        data: taskData,
      });

      res.status(200).json({ data: updatedTask, errors: null });
    } catch (error) {
      console.log(error);
      handleServerError(res, 500, [
        "Ocorreu um erro a criar ou atualizar a tarefa",
      ]);
    }
  } catch (err) {
    handleServerValidationError(res, 400, err);
    return;
  }
};
