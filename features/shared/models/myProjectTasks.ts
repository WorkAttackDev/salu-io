import { Project, Task } from "@prisma/client";

export type MyProjectTasks = Project & {
  tasks?: Task[];
};
