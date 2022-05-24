import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { editUserController } from "@/api/users/controllers/edit_user";

const handler = getNextConnectHandler({
  allowMethods: ["POST"],
  errMessage: ["erro ao editar usuário"],
});

callAuthWithCookieMiddleware(handler);

handler.post(editUserController);

export default handler;
