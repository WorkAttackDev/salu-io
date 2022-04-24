import { ProjectParticipant } from "@prisma/client";
import { MyUserInfo } from "./myUser";

export type MyProjectParticipant = ProjectParticipant & {
  user: MyUserInfo;
};
