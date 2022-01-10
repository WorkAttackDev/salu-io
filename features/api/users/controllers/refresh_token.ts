import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { ApiResponse } from "../../../shared/types";
import {
  API_SECRET,
  issueJWToken,
  REFRESH_TOKEN_COOKIE_NAME,
} from "../util/jwt";

export const refreshTokenController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<string>>
) => {
  const cookies = new Cookies(req, res, { keys: [API_SECRET] });
  const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME, {
    signed: true,
  });

  if (!refreshToken)
    return handleServerError(res, 400, ["refresh token inválido"]);

  try {
    const rToken = await prisma.token.findUnique({
      where: { token: refreshToken },
    });

    if (!rToken) {
      handleServerError(res, 400, ["token inválido"]);
      return;
    }

    if (rToken.expiresAt.getTime() <= Date.now()) {
      handleServerError(res, 400, ["token expirado"]);
      return;
    }

    const { token } = await issueJWToken({
      req,
      res,
      userId: rToken.userId.toString(),
    });

    res.status(200).json({ data: token, errors: null });
  } catch (error) {
    console.log(error);
    handleServerError(res, 500, ["ocorreu um erro ao gerar o token"]);
  }
};
