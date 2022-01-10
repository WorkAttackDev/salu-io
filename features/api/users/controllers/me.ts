import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import {
  handleServerError,
  handleServerValidationError,
} from "../../../shared/lib/server_errors";
import { MyUser } from "../../../shared/models/my_user";
import { ApiResponse } from "../../../shared/types";
import { AuthMiddleware } from "../../core/middlewares/auth";
import { sanitizedUser } from "./util";

export const meController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyUser>>
) => {
  let userId;
  try {
    try {
      const f = (await AuthMiddleware(req, res)) as JwtPayload;
      userId = f.sub;
    } catch (error) {
      return handleServerError(res, 401, ["bearer token inválido"]);
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: +userId! },
      });

      if (!user) {
        handleServerError(res, 400, ["usuário não existe"]);
        return;
      }

      res.status(200).json({ data: sanitizedUser(user), errors: null });
    } catch (error) {
      console.log(error);
      handleServerError(res, 500, ["ocorreu um erro ao fazer o login"]);
    }
  } catch (err) {
    handleServerValidationError(res, 400, err);
  }
};
