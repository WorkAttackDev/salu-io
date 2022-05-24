import { WdkApp } from "@/api/core/config/app";
import { WdkMailer } from "@/api/mailer";
import { Mailer, UserUseCases } from "@workattackdev/wdk";
import { NextApiRequest, NextApiResponse } from "next";
import { handleServerErrorV2 } from "../../../shared/lib/server_errors";
import { resetPasswordValidate } from "../../../shared/lib/validation";
import { ApiResponse } from "../../../shared/types";
import deleteTokenByTokenRepository from "../dataRepositories/implementations/deleteTokenByTokenRepository";
import findTokenByTokenRepository from "../dataRepositories/implementations/findTokenByTokenRepository";
import updateUserPasswordRepository from "../dataRepositories/implementations/updateUserPasswordRepository";

export const resetTokenController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  try {
    const { password, token: reqToken } = resetPasswordValidate(req.body);

    const data = await UserUseCases.resetPasswordUseCase({
      data: {
        password,
        token: reqToken,
      },
      deleteResetToken: deleteTokenByTokenRepository,
      findResetToken: findTokenByTokenRepository,
      mailer: await WdkMailer,
      resetPasswordEmailTemplate: (data) =>
        Mailer.Templates.resetPasswordEmailTemplate({ ...data, app: WdkApp }),
      sendEmail: Mailer.sendEmail,
      updateUserPassword: updateUserPasswordRepository,
    });

    // TODO: send email notify user password changed

    res.status(200).json({ data: !!data.data, errors: data.errors });
  } catch (error) {
    handleServerErrorV2({
      err: error as any,
      res,
      status: 500,
      messages: ["ocorreu um erro ao redefinir a password"],
    });
  }
};
