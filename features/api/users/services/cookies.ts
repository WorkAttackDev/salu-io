import { WdkApp } from "@/api/core/config/app";
import { Core } from "@workattackdev/wdk";

export const cookiesInstance = (req: any, res: any) =>
  Core.makeCookiesInstance({
    req,
    res,
    app: WdkApp,
    opts: {
      path: "/",
      sameSite: "strict",
      secure: WdkApp.IS_PRODUCTION,
    },
  });
