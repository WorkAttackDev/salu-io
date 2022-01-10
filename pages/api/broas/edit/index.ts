// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createBroaController } from "../../../../features/api/broas/controllers/createBroaController";
import { AuthMiddleware } from "../../../../features/api/core/middlewares/auth";
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
    case "POST": {
      await createBroaController(req, res);
      break;
    }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
