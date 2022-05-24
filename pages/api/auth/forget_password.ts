import { forgetPasswordController } from "../../../features/api/users/controllers/forget_password";

import { getNextConnectHandler } from "@/api/core/config/nextConnect";

const handler = getNextConnectHandler({
  allowMethods: ["POST"],
  errMessage: ["erro ao enviar email para redefinir password"],
});

handler.post(forgetPasswordController);

export default handler;
