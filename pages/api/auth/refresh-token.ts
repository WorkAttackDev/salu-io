// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { refreshTokenController } from "../../../features/api/users/controllers/refresh_token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      await refreshTokenController(req, res);
      break;
    }

    default:
      // Todo Create a error handler function
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ error: `Metodo ${method} não permitido` });
      break;
  }
}
