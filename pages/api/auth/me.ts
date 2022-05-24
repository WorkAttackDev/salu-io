import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { meController } from "@/api/users/controllers/meController";

const handler = getNextConnectHandler({
  allowMethods: ["GET"],
  errMessage: ["erro ao buscar dados do usuário"],
});

callAuthWithCookieMiddleware(handler);

handler.get(meController);

export default handler;
