import { User } from ".prisma/client";

export const sanitizedUser = (user: User) => {
  const { password, ...validUser } = user;
  return validUser;
};

export const slugify = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\-]+/g, "-");
