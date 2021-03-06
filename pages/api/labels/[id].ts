import {
  callAuthMiddleware,
  getNextConnectHandler,
} from "../../../features/api/core/config/nextConnect";
import editLabelController from "../../../features/api/label/controllers/editLabel";

const handler = getNextConnectHandler({
  allowMethods: ["POST"],
  errMessage: ["erro ao editar label"],
});

callAuthMiddleware(handler);

handler.post(editLabelController);

export default handler;
