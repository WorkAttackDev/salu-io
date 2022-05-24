import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { addParticipantsController } from "@/api/project/controllers/participants/addParticipantsController";
import { deleteParticipantsController } from "@/api/project/controllers/participants/deleteParticipantsController";

const handler = getNextConnectHandler({
  allowMethods: ["POST", "DELETE"],
  errMessage: ["erro na rota de participantes"],
});

callAuthWithCookieMiddleware(handler);

handler.post(addParticipantsController);
handler.delete(deleteParticipantsController);

export default handler;
