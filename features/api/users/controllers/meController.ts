import { handleServerErrorV2 } from "@/shared/lib/server_errors";
import { UserUseCases } from "@workattackdev/wdk";
import { ApiResponse } from "@workattackdev/wdk/lib/core";
import { NextApiRequest, NextApiResponse } from "next";
import { MyUser, MyWdkUser } from "../../../shared/models/myUser";
import findUserByIdRepository from "../dataRepositories/implementations/findUserByIdRepository";

export const meController = async (
  req: NextApiRequest & {
    userId?: string;
  },
  res: NextApiResponse<ApiResponse<MyUser | null>>
) => {
  const userId = req.userId;

  try {
    const user = await UserUseCases.meUseCase<MyWdkUser>({
      userId: userId!,
      findUserById: findUserByIdRepository,
    });

    if (!user.data) {
      return handleServerErrorV2({
        res,
        messages: user.errors || ["Ocorreu um erro ao buscar dados do usuário"],
        err: new Error("No data returned from wdk me use case"),
        status: 400,
      });
    }

    res.status(200).json({ data: user.data, errors: null });
  } catch (error) {
    handleServerErrorV2({
      err: error as any,
      res,
      status: 500,
      messages: ["Erro ao buscar dados do usuário"],
    });
  }
};
