import { MyTask } from "../../../shared/models/myTask";
import create from "zustand";

type TaskStore = {
  task?: MyTask;
  setTask: (task?: MyTask) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  task: undefined,
  setTask: (task) => set({ task: task }),
}));
