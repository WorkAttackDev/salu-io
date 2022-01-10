import { NextApiRequest, NextApiResponse } from "next";
import { handleServerError } from "../../../shared/lib/server_errors";
import { verifyJWToken } from "../../users/util/jwt";

export const AuthMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken)
    return handleServerError(res, 401, ["bearer token inválido"]);

  const [, token] = bearerToken.trim().split(" ");

  return verifyJWToken(token);
};
