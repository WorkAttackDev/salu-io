import type { NextApiRequest, NextApiResponse } from "next";
import { getBroasController } from "../../../features/api/broas/controllers/getBroasController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // try {
  //   await AuthMiddleware(req, res);
  // } catch (error) {
  //   return handleServerError(res, 401, ["bearer token inválido"]);
  // }

  switch (method) {
    case "GET": {
      await getBroasController(req, res);
      return;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
