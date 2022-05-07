import type { NextApiRequest, NextApiResponse } from "next";
import { AuthMiddleware } from "../../../../features/api/core/middlewares/auth";
import { deleteTaskByIdController } from "../../../../features/api/task/controllers/deleteTaskByIdController";
import { handleServerError } from "../../../../features/shared/lib/server_errors";

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
    case "DELETE": {
      await deleteTaskByIdController(req, res);
      break;
    }

    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
