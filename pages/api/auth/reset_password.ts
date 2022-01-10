import type { NextApiRequest, NextApiResponse } from "next";
import { resetTokenController } from "../../../features/api/users/controllers/reset_password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "PATCH": {
      await resetTokenController(req, res);
      break;
    }

    default:
      // Todo Create a error handler function
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).json({ error: `Metodo ${method} não permitido` });
      break;
  }
}
