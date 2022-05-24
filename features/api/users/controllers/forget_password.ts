import { WdkApp } from "@/api/core/config/app";
import { WdkMailer } from "@/api/mailer";
import { Mailer, UserUseCases } from "@workattackdev/wdk";
import { NextApiRequest, NextApiResponse } from "next";
import { handleServerErrorV2 } from "../../../shared/lib/server_errors";
import { forgetPasswordValidate } from "../../../shared/lib/validation";
import { ApiResponse } from "../../../shared/types";
import createForgotTokenRepository from "../dataRepositories/implementations/createForgotTokenRepository";
import deleteManyForgetTokenRepository from "../dataRepositories/implementations/deleteManyForgetTokenRepository";
import findUserByEmailRepository from "../dataRepositories/implementations/findUserByEmailRepository";

export const forgetPasswordController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  try {
    const { email } = forgetPasswordValidate(req.body);

    const data = await UserUseCases.forgotPasswordUseCase({
      data: {
        email,
      },
      createForgotToken: createForgotTokenRepository,
      deleteManyForgetToken: deleteManyForgetTokenRepository,
      findUserByEmail: findUserByEmailRepository,
      forgotPasswordEmailTemplate: (data) =>
        Mailer.Templates.forgotPasswordEmailTemplate({ ...data, app: WdkApp }),
      mailer: await WdkMailer,
      sendEmail: Mailer.sendEmail,
    });

    if (!data.data) {
      return handleServerErrorV2({
        res,
        messages: data.errors || ["Ocorreu um erro ao buscar dados do usuário"],
        err: new Error("No data returned from wdk forgot password use case"),
        status: 400,
      });
    }

    res.status(200).json({ data: data.data, errors: null });
  } catch (error) {
    handleServerErrorV2({
      err: error as any,
      res,
      status: 500,
      messages: ["ocorreu um erro ao redefinir a password"],
    });
  }
};
