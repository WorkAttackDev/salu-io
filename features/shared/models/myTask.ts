import { Project, Task } from "@prisma/client";

export type MyTask = Task & {
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
};
