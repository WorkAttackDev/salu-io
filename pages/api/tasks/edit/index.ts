import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { editTaskController } from "@/api/task/controllers/editTaskController";

const handler = getNextConnectHandler({
  allowMethods: ["POST"],
  errMessage: ["erro ao editar tarefa"],
});

callAuthWithCookieMiddleware(handler);

handler.post(editTaskController);

export default handler;
