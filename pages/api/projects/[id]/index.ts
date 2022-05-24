import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { deleteProjectController } from "@/api/project/controllers/deleteProjectController";
import { getProjectByIdController } from "@/api/project/controllers/getProjectByIdController";

const handler = getNextConnectHandler({
  allowMethods: ["GET", "DELETE"],
  errMessage: ["erro ao manipular projeto"],
});

callAuthWithCookieMiddleware(handler);

handler.get(getProjectByIdController);
handler.delete(deleteProjectController);

export default handler;
