import { Core } from "@workattackdev/wdk";

export const WdkApp = Core.initializeApp({
  ACCESS_TOKEN_COOKIE_NAME: process.env.ACCESS_TOKEN_COOKIE_NAME as string,
  API_SECRET: process.env.API_SECRET as string,
  DOMAIN: process.env.DOMAIN as string,
  HOST: process.env.HOST as string,
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  NAME: process.env.Name as string,
  REFRESH_TOKEN_COOKIE_NAME: process.env.REFRESH_TOKEN_COOKIE_NAME as string,
});
