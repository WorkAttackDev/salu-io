import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import {
  handleServerError,
  handleServerValidationError,
} from "../../../shared/lib/server_errors";
import { resetPasswordValidate } from "../../../shared/lib/validation";
import { ApiResponse } from "../../../shared/types";

import { hash } from "../util/hash";

export const resetTokenController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<string>>
) => {
  try {
    const { password, token: reqToken } = resetPasswordValidate(req.body);

    try {
      const token = await prisma.token.findUnique({
        where: { token: reqToken },
      });

      if (!token) {
        handleServerError(res, 400, ["token inválido"]);
        return;
      }

      if (token.expiresAt.getTime() <= Date.now()) {
        await prisma.token.delete({ where: { token: reqToken } });
        handleServerError(res, 400, ["token expirado"]);
        return;
      }

      await prisma.user.update({
        where: { id: token.userId },
        data: { password: await hash(password) },
      });

      await prisma.token.delete({ where: { token: reqToken } });

      // TODO: send email notify user password changed

      res
        .status(200)
        .json({ data: "password alterada com sucesso", errors: null });
    } catch (error) {
      console.log(error);
      handleServerError(res, 500, ["ocorreu um erro ao redefinir a password"]);
    }
  } catch (err) {
    handleServerValidationError(res, 400, err);
  }
};
