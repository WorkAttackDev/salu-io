import bcrypt from "bcrypt";

export const hash = async (value: string) => {
  return await bcrypt.hash(value, 10);
};

export const compareHash = async (plainValue: string, hashValue: string) => {
  return await bcrypt.compare(plainValue, hashValue);
};
