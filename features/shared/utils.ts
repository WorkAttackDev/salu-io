export const isProduction = process.env.NODE_ENV === "production";

export const DOMAIN = isProduction ? "salu-io.vercel.app" : "localhost";

export const HOST = isProduction
  ? process.env.HOST || "https://salu-io.vercel.app/"
  : "http://localhost:3000/";
