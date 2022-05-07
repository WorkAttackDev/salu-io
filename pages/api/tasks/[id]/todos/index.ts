import {
  callAuthMiddleware,
  getNextConnectHandler,
} from "../../../../../features/api/core/config/nextConnect";
import deleteTaskTodoController from "../../../../../features/api/task/todo/controllers/deleteTaskTodoController";
import getTaskTodosController from "../../../../../features/api/task/todo/controllers/getTaskTodosController";
import upsertTaskTodoController from "../../../../../features/api/task/todo/controllers/upsertTaskTodoController";

const handler = getNextConnectHandler({
  allowMethods: ["GET", "DELETE"],
  errMessage: ["Ocorreu um erro relacionado as tarefas"],
});

callAuthMiddleware(handler);

handler.get(getTaskTodosController);
handler.post(upsertTaskTodoController);
handler.delete(deleteTaskTodoController);

export default handler;
