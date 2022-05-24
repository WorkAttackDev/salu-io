import { WdkApp } from "@/api/core/config/app";
import { handleServerErrorV2 } from "@/shared/lib/server_errors";
import { UserUseCases } from "@workattackdev/wdk";
import { ApiResponse } from "@workattackdev/wdk/lib/core";
import { NextApiRequest, NextApiResponse } from "next";
import { MyUser } from "../../../shared/models/myUser";
import createRefreshTokenRepository from "../dataRepositories/implementations/createRefreshTokenRepository";
import deleteTokenByTokenRepository from "../dataRepositories/implementations/deleteTokenByTokenRepository";
import deleteUserRefreshTokensRepository from "../dataRepositories/implementations/deleteUserRefreshTokensRepository";
import findTokenByTokenRepository from "../dataRepositories/implementations/findTokenByTokenRepository";
import findUserByIdRepository from "../dataRepositories/implementations/findUserByIdRepository";
import { cookiesInstance } from "../services/cookies";

export const refreshTokenController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyUser | null>>
) => {
  try {
    const data = await UserUseCases.refreshTokenUseCase({
      app: WdkApp,
      cookies: cookiesInstance(req, res),
      createRefreshToken: createRefreshTokenRepository,
      deleteTokenRepository: deleteTokenByTokenRepository,
      findUserById: findUserByIdRepository,
      deleteUserRefreshTokens: deleteUserRefreshTokensRepository,
      findTokenByToken: findTokenByTokenRepository,
    });

    if (!data.data) {
      return handleServerErrorV2({
        res,
        messages: data.errors || ["Usuário não autenticado"],
        err: new Error("No data returned from wdk refresh token use case"),
        status: 401,
      });
    }

    data.data
      ? res.json({ data: data.data as any as MyUser, errors: null })
      : handleServerErrorV2({
          err: new Error("No data returned from wdk refresh token use case"),
          res,
          status: data.status || 400,
          messages: data.errors || [
            "Ocorreu um erro ao buscar dados do usuário",
          ],
        });
  } catch (error) {
    handleServerErrorV2({
      err: error as any,
      res,
      status: 500,
      messages: ["Erro ao atualizar a sessão"],
    });
  }
};
