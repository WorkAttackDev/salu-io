import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { getTasksController } from "@/api/task/controllers/getTasksController";

const handler = getNextConnectHandler({
  allowMethods: ["GET"],
  errMessage: ["erro ao recuperar tarefas"],
});

callAuthWithCookieMiddleware(handler);

handler.get(getTasksController);

export default handler;
