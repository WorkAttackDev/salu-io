import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "../../../features/api/core/config/nextConnect";
import deleteLabelController from "../../../features/api/label/controllers/deleteLabel";

const handler = getNextConnectHandler({
  allowMethods: ["DELETE"],
  errMessage: ["erro ao deletar label"],
});

callAuthWithCookieMiddleware(handler);

handler.delete(deleteLabelController);

export default handler;
