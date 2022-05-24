import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { getProjectsController } from "@/api/project/controllers/getProjectsController";

const handler = getNextConnectHandler({
  allowMethods: ["GET"],
  errMessage: ["erro ao recuperar projetos"],
});

callAuthWithCookieMiddleware(handler);

handler.get(getProjectsController);

export default handler;
