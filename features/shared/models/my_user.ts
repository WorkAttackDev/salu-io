import { User } from ".prisma/client";

export type MyUser = Omit<User, "password">;

export type MyUserInfo = {
  id: number;
  name: string;
  email: string;
};
