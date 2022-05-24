import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { updateProjectController } from "@/api/project/controllers/updateProjectController";

const handler = getNextConnectHandler({
  allowMethods: ["POST"],
  errMessage: ["erro ao editar projeto"],
});

callAuthWithCookieMiddleware(handler);

handler.post(updateProjectController);

export default handler;
