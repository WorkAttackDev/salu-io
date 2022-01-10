import { User } from ".prisma/client";
export type MyUser = Omit<User, "password">;
