export const isProduction = process.env.NODE_ENV === "production";

export const HOST = isProduction
  ? process.env.HOST || "https://salu-io.vercel.app/"
  : "http://localhost:3000/";
