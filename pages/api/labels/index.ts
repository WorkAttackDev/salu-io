import {
  callAuthWithCookieMiddleware,
  getNextConnectHandler,
} from "../../../features/api/core/config/nextConnect";
import getLabelsController from "../../../features/api/label/controllers/getLabels";
import removeLabelController from "../../../features/api/label/controllers/removeLabel";

const handler = getNextConnectHandler({
  allowMethods: ["GET", "DELETE"],
  errMessage: ["erro ao buscar labels"],
});

callAuthWithCookieMiddleware(handler);

handler.get(getLabelsController);
handler.delete(removeLabelController);

export default handler;
