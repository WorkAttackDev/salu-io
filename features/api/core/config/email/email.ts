import nodemailer from "nodemailer";
import { feedBackEmailTemplate } from "./templates";

// Email generator
const FROM_EMAIL = '"Noreply WorkAttack" <noreply@workattackangola.com>';

const TO_EMAIL = (to: string) => `${to}`;

const isProd = process.env.NODE_ENV === "production";

const createTransport = async () => {
  let testAccount = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: isProd ? process.env.EMAIL_HOST : "smtp.ethereal.email",
    port: isProd ? 465 : 587,
    secure: isProd ? true : false,
    auth: {
      user: isProd ? process.env.EMAIL_USERNAME : testAccount.user,
      pass: isProd ? process.env.EMAIL_PASSWORD : testAccount.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const sendEmail = async (
  email: string,
  subject: string,
  htmlTemplate: string
) => {
  const transporter = await createTransport();

  const info = await transporter.sendMail({
    from: FROM_EMAIL,
    to: TO_EMAIL(email),
    subject: subject,
    html: htmlTemplate,
  });

  console.log("Mensagem enviada: %s", info.messageId);
  console.log(
    "Link de Previsualização: %s",
    nodemailer.getTestMessageUrl(info)
  );
};
