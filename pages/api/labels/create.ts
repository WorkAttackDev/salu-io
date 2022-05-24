import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "../../../features/api/core/config/nextConnect";
import addOrCreateLabelController from "../../../features/api/label/controllers/addOrCreateLabel";

const handler = getNextConnectHandler({
  allowMethods: ["POST"],
  errMessage: ["erro ao criar label"],
});

callAuthWithCookieMiddleware(handler);

handler.post(addOrCreateLabelController);

export default handler;
