import { WdkApp } from "@/api/core/config/app";
import { handleServerErrorV2 } from "@/shared/lib/server_errors";
import { UserUseCases } from "@workattackdev/wdk";
import { ApiResponse } from "@workattackdev/wdk/lib/core";
import { NextApiRequest, NextApiResponse } from "next";

import deleteTokenByTokenRepository from "../dataRepositories/implementations/deleteTokenByTokenRepository";
import { cookiesInstance } from "../services/cookies";

export const logoutController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<boolean>>
) => {
  try {
    const isLoggedOut = await UserUseCases.logoutUseCase({
      app: WdkApp,
      deleteTokenByToken: deleteTokenByTokenRepository,
      cookiesInstance: cookiesInstance(req, res),
    });

    if (!isLoggedOut.data) {
      return handleServerErrorV2({
        err: new Error("Could not logout"),
        res,
        messages: ["Ocorreu um erro ao tentar terminar a sessão."],
        status: 400,
      });
    }

    return res.status(200).json({
      data: true,
      errors: null,
    });
  } catch (error) {
    handleServerErrorV2({
      err: error as any,
      res,
      messages: ["Ocorreu um erro ao tentar terminar a sessão."],
      status: 500,
    });
  }
};
