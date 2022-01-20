import type { NextApiRequest, NextApiResponse } from "next";
import { AuthMiddleware } from "../../../features/api/core/middlewares/auth";
import { getTasksController } from "../../../features/api/task/controllers/getTasksController";
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
    case "GET": {
      await getTasksController(req, res);
      return;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Método ${method} não permitido`);
      break;
  }
}
