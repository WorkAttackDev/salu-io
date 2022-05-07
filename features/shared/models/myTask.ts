import { Task, TaskTodo } from "@prisma/client";
import { MyLabel } from "./MyLabel";

export type MyTask = Task & {
  labels?: MyLabel[];
  todos?: TaskTodo[];
  startDate: string | Date | null;
  endDate: string | Date | null;
  createdAt: string;
  updatedAt: string;
};
