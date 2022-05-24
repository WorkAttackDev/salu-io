import { Mailer } from "@workattackdev/wdk";

export const WdkMailer = Mailer.initializeMailer({
  EMAIL_FROM: process.env.EMAIL_FROM as string,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD as string,
  EMAIL_USER: process.env.EMAIL_USER as string,
  EMAIL_HOST: process.env.EMAIL_HOST as string,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT as string),
  EMAIL_SECURE: process.env.EMAIL_SECURE === "true",
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME as string,
});
