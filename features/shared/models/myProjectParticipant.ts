import { ProjectParticipant } from "@prisma/client";
import { MyUserInfo } from "./my_user";

export type MyProjectParticipant = ProjectParticipant & {
  user: MyUserInfo;
};
