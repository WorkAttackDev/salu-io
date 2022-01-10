import { sign, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import prisma from "../../../client/core/config/prisma";

type IssueJWTokenParams = {
  req: NextApiRequest;
  res: NextApiResponse;
  generateRefreshToken?: boolean;
  userId: string;
};

export const REFRESH_TOKEN_COOKIE_NAME = "wabrf_ao";

export const API_SECRET = process.env.API_SECRET || "qwerty";

export const issueJWToken = async ({
  generateRefreshToken = false,
  userId,
  req,
  res,
}: IssueJWTokenParams) => {
  const token = sign({}, API_SECRET, {
    expiresIn: "1h",
    subject: userId,
  });

  if (!generateRefreshToken) return { token, refreshToken: null };

  await prisma.token.deleteMany({
    where: { id: +userId, AND: { type: "REFRESH_TOKEN" } },
  });

  const expiresAt = Date.now() + 86400000 * 120; // 4 mouths;

  const refetchToken = await prisma.token.create({
    data: {
      expiresAt: new Date(expiresAt),
      type: "REFRESH_TOKEN",
      userId: +userId,
    },
  });

  const cookies = new Cookies(req, res, {
    keys: [API_SECRET],
  });

  cookies.set(REFRESH_TOKEN_COOKIE_NAME, refetchToken.token, {
    httpOnly: true,
    // secure: true,
    maxAge: expiresAt,
    expires: new Date(expiresAt),
    signed: true,
    path: "/",
  });

  return {
    token,
    refreshToken: refetchToken,
  };
};

export const verifyJWToken = (token: string) => verify(token, API_SECRET);
