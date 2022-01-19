import type { NextApiRequest, NextApiResponse } from "next";
import { AuthMiddleware } from "../../../../features/api/core/middlewares/auth";
import { deleteProjectController } from "../../../../features/api/project/controllers/deleteProjectController";
import { getProjectByIdController } from "../../../../features/api/project/controllers/getProjectByIdController";
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
    case "GET": {
      await getProjectByIdController(req, res);
      break;
    }

    case "DELETE": {
      await deleteProjectController(req, res);
      break;
    }

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
