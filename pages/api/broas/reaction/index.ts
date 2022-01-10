import type { NextApiRequest, NextApiResponse } from "next";
import { toggleReactionController } from "../../../../features/api/broas/controllers/toggleReactionController";
import { AuthMiddleware } from "../../../../features/api/core/middlewares/auth";
import { handleServerError } from "../../../../features/shared/lib/server_errors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST": {
      try {
        await AuthMiddleware(req, res);
      } catch (error) {
        return handleServerError(res, 401, ["bearer token inválido"]);
      }

      await toggleReactionController(req, res);
      return;
    }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
