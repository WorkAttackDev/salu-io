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

export const isProduction = process.env.NODE_ENV === "production";
