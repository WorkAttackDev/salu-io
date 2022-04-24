import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerErrorV2 } from "../../../shared/lib/server_errors";
import { addOrCreateLabelValidate } from "../../../shared/lib/validation/label/addOrCreateLabel";
import { MyLabel } from "../../../shared/models/MyLabel";
import { ApiResponse } from "../../../shared/types";

const addOrCreateLabelController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyLabel>>
) => {
  try {
    const { name, color, type, projectOrTaskId, id } = addOrCreateLabelValidate(
      req.body
    );

    const label = !id
      ? await prisma.label.create({
          data: {
            name,
            color,
            projects:
              type === "Project"
                ? { connect: { id: projectOrTaskId } }
                : undefined,
            tasks:
              type === "Task"
                ? { connect: { id: projectOrTaskId } }
                : undefined,
          },
        })
      : await prisma.label.update({
          where: { id },
          data: {
            projects:
              type === "Project"
                ? { connect: { id: projectOrTaskId } }
                : undefined,
            tasks:
              type === "Task"
                ? { connect: { id: projectOrTaskId } }
                : undefined,
          },
        });

    res.status(200).json({ data: label, errors: null });
  } catch (error) {
    handleServerErrorV2({
      err: error,
      messages: ["Ocorreu um erro ao criar label"],
      res,
      status: 500,
    });
  }
};

export default addOrCreateLabelController;
