import type { NextApiRequest, NextApiResponse } from "next";
import { AuthMiddleware } from "../../../features/api/core/middlewares/auth";
import { editUserController } from "../../../features/api/users/controllers/edit_user";
import { handleServerError } from "../../../features/shared/lib/server_errors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    await AuthMiddleware(req, res);
  } catch (error) {
    return handleServerError(res, 401, ["bearer token inválido"]);
  }

  switch (method) {
    case "POST": {
      await editUserController(req, res);
      break;
    }

    default:
      // Todo Create a error handler function
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: `Metodo ${method} não permitido` });
      break;
  }
}
