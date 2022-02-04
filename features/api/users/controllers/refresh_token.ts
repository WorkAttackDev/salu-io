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

  if (!refreshToken) {
    console.error("No refresh token found in request cookies");
    return handleServerError(res, 400, ["erro de autenticação"]);
  }

  try {
    const rToken = await prisma.token.findUnique({
      where: { token: refreshToken },
    });

    if (!rToken) {
      console.log("refresh token not found");
      handleServerError(res, 400, ["erro de autenticação"]);
      return;
    }

    if (rToken.expiresAt.getTime() <= Date.now()) {
      console.log("refresh token expired");
      handleServerError(res, 400, ["error de autenticação"]);
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
    handleServerError(res, 500, ["erro de autenticação"]);
  }
};
