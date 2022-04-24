import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../client/core/config/prisma";
import { handleServerError } from "../../../shared/lib/server_errors";
import { tryCatch } from "../../../shared/lib/try_catch";
import { MyUserInfo } from "../../../shared/models/myUser";
import { ApiResponse } from "../../../shared/types";

export const getUsersController = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<MyUserInfo[]>>
) => {
  const [users, error] = await tryCatch(
    prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    })
  );

  if (error || !users) {
    handleServerError(res, 500, ["Ocorreu um erro ao buscar os usuários"]);
    return;
  }

  res.status(200).json({ data: users, errors: null });
};
