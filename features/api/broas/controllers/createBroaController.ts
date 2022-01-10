import { Broa } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import {
  handleServerError,
  handleServerValidationError,
} from "../../../shared/lib/server_errors";
import { editBroaValidate } from "../../../shared/lib/validation/edit_broa_validator";
import { ApiResponse } from "../../../shared/types";

export const createBroaController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Broa>>
) => {
  try {
    const validatedData = editBroaValidate(req.body);

    try {
      const newBroa = await prisma.broa.create({
        data: validatedData,
      });

      res.status(201).json({ data: newBroa, errors: null });
    } catch (error) {
      console.log(error);
      handleServerError(res, 500, ["Ocorreu um erro a cria a broa"]);
    }
  } catch (err) {
    handleServerValidationError(res, 400, err);
    return;
  }
};
