import type { NextApiRequest, NextApiResponse } from "next";
import { AuthMiddleware } from "../../../../features/api/core/middlewares/auth";
import { addParticipantsController } from "../../../../features/api/project/controllers/participants/addParticipantsController";
import { deleteParticipantsController } from "../../../../features/api/project/controllers/participants/deleteParticipantsController";
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
      await addParticipantsController(req, res);
      return;
    }
    case "DELETE": {
      await deleteParticipantsController(req, res);
      return;
    }
    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Método ${method} não permitido`);
      break;
  }
}
