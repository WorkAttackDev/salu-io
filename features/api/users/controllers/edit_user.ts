import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import {
  handleServerError,
  handleServerValidationError,
} from "../../../shared/lib/server_errors";
import { tryCatch } from "../../../shared/lib/try_catch";
import { editUserValidate } from "../../../shared/lib/validation/edit_user_validator";
import { MyUser } from "../../../shared/models/my_user";
import { ApiResponse } from "../../../shared/types";
import { sanitizedUser, slugify } from "./util";

// export edit user name and user name
export const editUserController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyUser>>
) => {
  try {
    const { name, userName, id } = editUserValidate(req.body);

    if (!id) {
      handleServerError(res, 400, ["id não informado"]);
      return;
    }

    const [VerifyUser, VerifyError] = await tryCatch(
      prisma.user.findFirst({
        where: { userName: slugify(userName), AND: { id: { not: id } } },
      })
    );

    if (VerifyError) {
      handleServerError(res, 500, [
        "ocorreu um erro ao verificar o nome de usuário",
      ]);
      return;
    }

    if (VerifyUser) {
      handleServerError(res, 400, ["nome de usuário já existe"]);
      return;
    }

    try {
      const user = await prisma.user.update({
        where: { id },
        data: { name, userName: slugify(userName) },
      });

      res.status(200).json({ data: sanitizedUser(user), errors: null });
    } catch (error) {
      handleServerError(res, 500, ["erro ao editar usuário"]);
    }
  } catch (error) {
    handleServerValidationError(res, 400, error);
  }
};
