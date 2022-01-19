import type { NextApiRequest, NextApiResponse } from "next";
import { getProjectsController } from "../../../features/api/project/controllers/getProjectsController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      await getProjectsController(req, res);
      return;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
