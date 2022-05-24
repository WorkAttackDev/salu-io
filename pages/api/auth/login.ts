import { loginController } from "../../../features/api/users/controllers/login";

import { getNextConnectHandler } from "@/api/core/config/nextConnect";

const handler = getNextConnectHandler({
  allowMethods: ["POST"],
  errMessage: ["erro ao iniciar sessão"],
});

handler.post(loginController);

export default handler;
