import { DnDItemType } from "@/client/core/hooks/useDnD";
import { useProjectStore } from "@/client/project/stores/useProductsStore";
import { EditTaskValidationParams } from "@/shared/lib/validation/editTaskValidator";
import shallow from "zustand/shallow";
import useEditTask from "./useEditTask";

const useMoveTask = () => {
  const project = useProjectStore((state) => state.selectedProject, shallow);

  const { handleEditTask, isLoading } = useEditTask();

  const handleMoveTask = async (data: DnDItemType) => {
    const movedTask = project?.tasks?.find((task) => task.id === data.id);

    if (!movedTask) return;

    const adjustedData: EditTaskValidationParams & { id?: string } = {
      ...movedTask,
      description: movedTask.description!,
      startDate: movedTask.startDate as string | undefined,
      endDate: movedTask.endDate as string | undefined,
    };

    await handleEditTask(adjustedData);
  };

  return {
    handleMoveTask,
    isLoading,
  };
};

export default useMoveTask;
