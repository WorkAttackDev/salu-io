import type { NextApiRequest, NextApiResponse } from "next";
import { getTasksController } from "../../../features/api/task/controllers/getTasksController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

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
