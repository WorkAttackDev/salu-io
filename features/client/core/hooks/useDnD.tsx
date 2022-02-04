export type DnDItemType = {
  order: string;
  id: number;
};

const useDnD = <ItemType extends DnDItemType>(
  list: ItemType[],
  setList?: (list: ItemType[]) => void
) => {
  // const [dragIndex, setDragIndex] = useState<number>(-1);

  const handleDragStart = (e: React.DragEvent<HTMLElement>, id: number) => {
    const target = e.currentTarget;

    target.style.opacity = "0.4";

    e.dataTransfer.effectAllowed = "move";

    if (list.length) {
      e.dataTransfer.setData("text/plain", id.toString());
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.opacity = "1";
    e.currentTarget.classList.remove("ring-2");
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault?.();
    return false;
  };

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.classList.add("ring-2");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.classList.remove("ring-2");
  };

  const handleDrop = (
    e: React.DragEvent<HTMLElement>,
    id: number,
    callback: (data: [DnDItemType] | [DnDItemType, DnDItemType]) => void,
    swap = false
  ) => {
    e.preventDefault?.();
    e.stopPropagation?.();
    const target = e.currentTarget;

    target.classList.remove("ring-2");

    const newDragId = +e.dataTransfer.getData("text/plain");

    if (newDragId === id || !list.length) return false;

    const { dragged, dropped, draggedIndex, droppedIndex } = list.reduce<{
      dragged?: ItemType;
      dropped?: ItemType;
      draggedIndex?: number;
      droppedIndex?: number;
    }>((acc, item, i) => {
      if (item.id === newDragId) {
        acc.dragged = item;
        acc.draggedIndex = i;
        return acc;
      }

      if (item.id === id) {
        acc.dropped = item;
        acc.droppedIndex = i;
        return acc;
      }

      return acc;
    }, {});

    if (
      !dragged ||
      !dropped ||
      draggedIndex === undefined ||
      droppedIndex === undefined
    )
      return false;

    list.splice(draggedIndex, 1, { ...dragged, order: dropped.order });

    swap && list.splice(droppedIndex, 1, { ...dropped, order: dragged.order });

    setList?.(list);

    callback?.([
      {
        id: list[draggedIndex].id,
        order: list[draggedIndex].order,
      },
      {
        id: list[droppedIndex].id,
        order: list[droppedIndex].order,
      },
    ]);

    return false;
  };

  return {
    handleDragEnd,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDragStart,
    handleDrop,
  };
};

export default useDnD;
