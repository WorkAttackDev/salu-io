import { Token } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import {
  handleServerError,
  handleServerValidationError,
} from "../../../shared/lib/server_errors";
import { forgetPasswordValidate } from "../../../shared/lib/validation";
import { ApiResponse } from "../../../shared/types";
import { sendEmail } from "../../core/config/email/email";
import { forgetPasswordHTMLTemplate } from "../../core/config/email/templates/forget_password";

const host = process.env.HOST;

export const forgetPasswordController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Token>>
) => {
  try {
    const { email } = forgetPasswordValidate(req.body);

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        handleServerError(res, 400, ["usuário não existe"]);
        return;
      }

      if (user.providerId) {
        handleServerError(res, 400, ["usuário iniciou sessão com um provedor"]);
        return;
      }

      await prisma.token.deleteMany({
        where: { userId: user.id, AND: { type: "FORGET_TOKEN" } },
      });

      const expiresAt = new Date(Date.now() + 3_600_000);

      const token = await prisma.token.create({
        data: {
          expiresAt,
          owner: { connect: { id: user.id } },
          type: "FORGET_TOKEN",
        },
      });

      await sendEmail(
        user.email,
        "Recuperação de Password",
        forgetPasswordHTMLTemplate(
          host + "/auth/reset-password?token=" + token.token
        )
      );

      res.status(200).json({ data: token, errors: null });
    } catch (error) {
      console.log(error);
      handleServerError(res, 500, ["ocorreu um erro ao redefinir a password"]);
    }
  } catch (err) {
    handleServerValidationError(res, 400, err);
  }
};
