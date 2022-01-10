import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import {
  handleServerError,
  handleServerValidationError,
} from "../../../shared/lib/server_errors";
import { loginValidation } from "../../../shared/lib/validation";
import { MyUser } from "../../../shared/models/my_user";
import { ApiResponse } from "../../../shared/types";
import { compareHash } from "../util/hash";
import { issueJWToken } from "../util/jwt";
import { sanitizedUser } from "./util";

export const loginController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ token: string; user: MyUser }>>
) => {
  try {
    const { email, password } = loginValidation(req.body);
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        handleServerError(res, 400, ["usuário não existe"]);
        return;
      }

      if (user.providerId) {
        handleServerError(res, 403, ["usuário não existe"]);
        return;
      }

      const isValidPassword = await compareHash(password, user.password);

      if (!isValidPassword) {
        handleServerError(res, 400, ["password incorreta"]);
        return;
      }

      const { token } = await issueJWToken({
        req,
        res,
        generateRefreshToken: true,
        userId: user.id.toString(),
      });

      res
        .status(200)
        .json({ data: { token, user: sanitizedUser(user) }, errors: null });
    } catch (error) {
      console.log(error);
      handleServerError(res, 500, ["ocorreu um erro ao fazer o login"]);
    }
  } catch (err) {
    handleServerValidationError(res, 400, err);
  }
};
