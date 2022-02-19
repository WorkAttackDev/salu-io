import dayjs from "dayjs";

interface SortByDateArgs {
  createdAt: Date | string;
  updatedAt: Date | string;
}

export const sortByDate = <ListModel extends SortByDateArgs>(
  list: ListModel[]
) => {
  const defaultDate = new Date();

  list.sort((a, b) => {
    const aDate =
      typeof a.createdAt === "string" ? new Date(a.createdAt) : a.createdAt;
    const bDate =
      typeof b.createdAt === "string" ? new Date(b.createdAt) : b.createdAt;

    return (aDate ?? defaultDate) > (bDate ?? defaultDate)
      ? -1
      : (aDate ?? defaultDate) < (bDate ?? defaultDate)
      ? 1
      : 0;
  });
};

export const calculateRemainTime = (timing: {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
}) => {
  if (!timing.endDate || !timing.startDate) return "indefinido";
  type Unit = "month" | "days" | "hours" | "minutes";
  const finishIn = (unit: Unit) =>
    dayjs(dayjs(timing.endDate)).diff(dayjs(), unit);

  return finishIn("month") > 0
    ? `Termina em ${finishIn("month") + 1} meses`
    : finishIn("days") > 0
    ? `Termina em ${finishIn("days")} dias`
    : finishIn("hours") > 0
    ? `Termina em ${finishIn("hours")} horas`
    : finishIn("minutes") > 0
    ? `Termina em ${finishIn("minutes")} minutos`
    : "Já terminou";
};
