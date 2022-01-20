import { Project } from "@prisma/client";
import { MyTask } from "./myTask";

export type MyProjectTasks = Project & {
  tasks?: MyTask[];
};
