import { NextApiRequest, NextApiResponse } from "next";
import { getBroasByUserIdController } from "../../../../features/api/broas/controllers/getBroasByUserIdController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      await getBroasByUserIdController(req, res);
      return;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Metodo ${method} não permitido`);
      break;
  }
}
