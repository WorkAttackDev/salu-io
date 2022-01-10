import type { NextApiRequest, NextApiResponse } from "next";
import { loginWithGoogleController } from "../../../features/api/users/controllers/login_with_google";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST": {
      await loginWithGoogleController(req, res);
      break;
    }

    default:
      // Todo Create a error handler function
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: `Metodo ${method} não permitido` });
      break;
  }
}
