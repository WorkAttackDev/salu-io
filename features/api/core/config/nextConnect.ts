import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextConnect } from "next-connect";
import { handleServerErrorV2 } from "../../../shared/lib/server_errors";
import { AuthWithCookieMiddleware } from "../middlewares/authWithCookie";

type Params = {
  errMessage: string[];
  allowMethods: string[];
};

export const getNextConnectHandler = ({ allowMethods, errMessage }: Params) =>
  nextConnect<NextApiRequest, NextApiResponse>({
    onError: (error, req, res) => {
      console.log("global error: ", error);

      handleServerErrorV2({
        err: error,
        res,
        status: res.statusCode || 500,
        messages: errMessage,
      });
    },
    onNoMatch(req, res) {
      res.setHeader("Allow", allowMethods);
      res.status(405).json({ error: `Método ${req.method} não permitido` });
    },
  });

export const callAuthWithCookieMiddleware = (
  handler: NextConnect<NextApiRequest, NextApiResponse<any>>
) =>
  handler.use(async (req, res, next) => {
    try {
      await AuthWithCookieMiddleware(req, res);
      next();
    } catch (error) {
      return handleServerErrorV2({
        err: error as any,
        res,
        status: 401,
        messages: ["token inválido"],
      });
    }
  });
