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

const finishInFn = ({
  time,
  moment,
}: {
  time: string | Date;
  moment: "start" | "finish";
}) => {
  type Unit = "month" | "days" | "hours" | "minutes";

  const finishIn = (unit: Unit) => dayjs(dayjs(time)).diff(dayjs(), unit);

  const momentText = moment === "start" ? "Começou" : "Termina";

  return finishIn("month") > 0
    ? `${momentText} em ${finishIn("month") + 1} meses`
    : finishIn("days") > 0
    ? `${momentText} em ${finishIn("days")} dias`
    : finishIn("hours") > 0
    ? `${momentText} em ${finishIn("hours")} horas`
    : finishIn("minutes") > 0
    ? `${momentText} em ${finishIn("minutes")} minutos`
    : "Já terminou";
};

export const calculateRemainTime = (timing: {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
}) => {
  if (timing.endDate) {
    return finishInFn({ time: timing.endDate, moment: "finish" });
  }

  if (timing.startDate)
    return finishInFn({ time: timing.startDate, moment: "start" });

  return "indefinido";
};

export const convertToValidDateTime = (date: string | Date) => {
  return dayjs(date)
    .toISOString()
    .replace(/:\d\d.000Z$/i, "");
};
