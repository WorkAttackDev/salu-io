import { Task } from "@prisma/client";

export type MyTask = Task & {
  startDate: string | Date | null;
  endDate: string | Date | null;
  createdAt: string;
  updatedAt: string;
};
