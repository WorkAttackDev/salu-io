import { Label } from "@prisma/client";

export const LabelType = ["Project", "Task"] as const;
export type MyLabel = Label & {};
