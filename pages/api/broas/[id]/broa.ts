import type { NextApiRequest, NextApiResponse } from "next";
import { deleteBroaController } from "../../../../features/api/broas/controllers/deleteBroaController";
import { getBroaByIdController } from "../../../../features/api/broas/controllers/getBroaByIdController";
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
    case "GET": {
      await getBroaByIdController(req, res);
      break;
    }

    case "DELETE": {
      await deleteBroaController(req, res);
      break;
    }

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
