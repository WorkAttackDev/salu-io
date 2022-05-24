import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "@/api/core/config/nextConnect";
import { createProjectController } from "@/api/project/controllers/createProjectController";

const handler = getNextConnectHandler({
  allowMethods: ["POST"],
  errMessage: ["erro ao criar projeto"],
});

callAuthWithCookieMiddleware(handler);

handler.post(createProjectController);

export default handler;
