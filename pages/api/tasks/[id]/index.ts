import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { deleteTaskByIdController } from "@/api/task/controllers/deleteTaskByIdController";

const handler = getNextConnectHandler({
  allowMethods: ["DELETE"],
  errMessage: ["erro ao deletar tarefa"],
});

callAuthWithCookieMiddleware(handler);

handler.delete(deleteTaskByIdController);

export default handler;
