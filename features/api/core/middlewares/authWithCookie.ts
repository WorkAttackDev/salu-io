import { refreshTokenController } from "@/api/users/controllers/refreshTokenController";
import { JwtPayload, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { WdkApp } from "../config/app";

export const AuthWithCookieMiddleware = async (
  req: NextApiRequest & {
    userId?: string;
  },
  res: NextApiResponse
) => {
  const accessToken = req.cookies[WdkApp.ACCESS_TOKEN_COOKIE_NAME];

  if (!accessToken) throw new Error("Authorization is required");

  try {
    const payload = await verify(accessToken, WdkApp.API_SECRET);
    req.userId = (payload as JwtPayload).sub;
    return payload;
  } catch (error) {
    return refreshTokenController(req, res);
  }
};
