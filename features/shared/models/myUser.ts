import { User, Role } from ".prisma/client";

export type MyUser = Omit<User, "password">;

export type MyWdkUser = MyUser & {
  isDeleted: boolean;
};

export type MyUserInfo = {
  id: string;
  name: string;
  email: string;
  role?: Role;
};
