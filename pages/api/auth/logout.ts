import { logoutController } from "../../../features/api/users/controllers/logoutController";

import { getNextConnectHandler } from "@/api/core/config/nextConnect";

const handler = getNextConnectHandler({
  allowMethods: ["GET"],
  errMessage: ["erro ao terminar sessão"],
});

handler.get(logoutController);

export default handler;
