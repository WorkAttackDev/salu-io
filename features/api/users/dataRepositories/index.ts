import { MyUser } from "../../../shared/models/myUser";

export type GetFullUserRepository = (userId: string) => Promise<MyUser | null>;

export type DeleteTokenByTokenRepository = (token: string) => Promise<void>;
