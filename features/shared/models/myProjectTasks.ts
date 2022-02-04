import { Project } from "@prisma/client";
import { MyProjectParticipant } from "./myProjectParticipant";
import { MyTask } from "./myTask";

export type MyProject = Project & {
  tasks?: MyTask[];
  participants?: MyProjectParticipant[];
};
