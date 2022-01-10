import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { ApiResponse } from "../../../shared/types";
import { API_SECRET, REFRESH_TOKEN_COOKIE_NAME } from "../util/jwt";

export const logoutController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  const cookies = new Cookies(req, res, { keys: [API_SECRET] });
  const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME, {
    signed: true,
  });

  if (!refreshToken)
    return handleServerError(res, 400, ["refresh token inválido"]);

  try {
    await prisma.token.delete({
      where: { token: refreshToken },
    });

    cookies.set(REFRESH_TOKEN_COOKIE_NAME);

    res.json({ data: true, errors: null });
  } catch (err) {
    handleServerError(res, 500, ["ocorreu um erro ao fazer o logout"]);
  }
};
