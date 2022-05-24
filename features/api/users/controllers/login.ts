import { WdkApp } from "@/api/core/config/app";
import { handleServerErrorV2 } from "@/shared/lib/server_errors";
import { loginValidation } from "@/shared/lib/validation";
import { UserUseCases } from "@workattackdev/wdk";
import type { ApiResponse } from "@workattackdev/wdk/lib/core";
import { NextApiRequest, NextApiResponse } from "next";
import { MyUser, MyWdkUser } from "../../../shared/models/myUser";
import createRefreshTokenRepository from "../dataRepositories/implementations/createRefreshTokenRepository";
import deleteUserRefreshTokensRepository from "../dataRepositories/implementations/deleteUserRefreshTokensRepository";
import findUserByEmailRepository from "../dataRepositories/implementations/findUserByEmailRepository";
import { cookiesInstance } from "../services/cookies";

export const loginController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyUser>>
) => {
  try {
    const { email, password } = loginValidation(req.body);

    const loginRes = await UserUseCases.loginUseCase<MyWdkUser>({
      app: WdkApp,
      data: { email, password },
      createRefreshToken: createRefreshTokenRepository,
      deleteUserRefreshTokens: deleteUserRefreshTokensRepository,
      findUserByEmail: findUserByEmailRepository,
      cookiesInstance: cookiesInstance(req, res),
    });

    if (!loginRes.data) {
      return handleServerErrorV2({
        res,
        messages: loginRes.errors || ["Ocorreu um erro ao iniciar sessão"],
        err: new Error("No data returned from wdk login use case"),
        status: 400,
      });
    }

    res.status(200).json({
      data: loginRes.data.user,
      errors: null,
    });
  } catch (error) {
    handleServerErrorV2({
      err: error as any,
      res,
      status: 500,
      messages: ["ocorreu um erro ao iniciar sessão"],
    });
  }
};
