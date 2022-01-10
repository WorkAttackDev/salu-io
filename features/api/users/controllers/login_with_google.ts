import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import {
  handleServerError,
  handleServerValidationError,
} from "../../../shared/lib/server_errors";
import { loginWithGoogleValidation } from "../../../shared/lib/validation";
import { MyUser } from "../../../shared/models/my_user";
import { hash } from "../util/hash";
import { issueJWToken } from "../util/jwt";
import { sanitizedUser, slugify } from "./util";
import cuid from "cuid";
import { ApiResponse } from "../../../shared/types";

export const loginWithGoogleController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ token: string; user: MyUser }>>
) => {
  try {
    const { email, email_verified, name, picture, sub } =
      loginWithGoogleValidation(req.body);

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (user && user.providerId === ["google", sub].join("|")) {
        const { token } = await issueJWToken({
          req,
          res,
          generateRefreshToken: true,
          userId: user.id.toString(),
        });

        res
          .status(200)
          .json({ data: { token, user: sanitizedUser(user) }, errors: null });
        return;
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          picture,
          providerId: ["google", sub].join("|"),
          emailVerified: email_verified,
          userName: slugify(name.toLowerCase()) + "-" + cuid(),
          password: await hash(["google", sub].join("|")),
        },
      });

      const { token } = await issueJWToken({
        req,
        res,
        generateRefreshToken: true,
        userId: newUser.id.toString(),
      });

      res
        .status(200)
        .json({ data: { token, user: sanitizedUser(newUser) }, errors: null });
    } catch (error) {
      console.log(error);
      handleServerError(res, 500, [
        "ocorreu um erro ao fazer o login com o google",
      ]);
    }
  } catch (err) {
    handleServerValidationError(res, 400, err);
  }
};
