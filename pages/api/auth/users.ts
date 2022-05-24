import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { getUsersController } from "../../../features/api/users/controllers/getUsersController";

const handler = getNextConnectHandler({
  allowMethods: ["GET"],
  errMessage: ["erro ao buscar dados do usuários"],
});

callAuthWithCookieMiddleware(handler);

handler.get(getUsersController);

export default handler;
