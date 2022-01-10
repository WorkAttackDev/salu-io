// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { forgetPasswordController } from "../../../features/api/users/controllers/forget_password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST": {
      await forgetPasswordController(req, res);
      break;
    }

    default:
      // Todo Create a error handler function
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: `Metodo ${method} não permitido` });
      break;
  }
}
