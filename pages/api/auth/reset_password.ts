import { resetTokenController } from "../../../features/api/users/controllers/resetPasswordController";
import { getNextConnectHandler } from "@/api/core/config/nextConnect";

const handler = getNextConnectHandler({
  allowMethods: ["PATCH"],
  errMessage: ["erro ao redefinir password"],
});

handler.patch(resetTokenController);

export default handler;
