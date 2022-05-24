import { Mailer } from "@workattackdev/wdk";

(async () => {
  await Mailer.script.generateEmailEnvFile();
})();

export {};
