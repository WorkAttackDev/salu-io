import { Task } from "@prisma/client";
import { MyLabel } from "./MyLabel";

export type MyTask = Task & {
  labels?: MyLabel[];
  startDate: string | Date | null;
  endDate: string | Date | null;
  createdAt: string;
  updatedAt: string;
};
