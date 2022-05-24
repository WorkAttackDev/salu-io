import { AxiosInstance } from "@/client/core/config/client";
import { useAuthStore } from "@/client/core/stores/authStore";
import { useErrorStore } from "@/client/core/stores/errorStore";
import { useProjectStore } from "@/client/project/stores/useProductsStore";
import {
  editTaskValidate,
  EditTaskValidationParams,
} from "@/shared/lib/validation/editTaskValidator";
import { MyTask } from "@/shared/models/myTask";
import { ApiResponse } from "@/shared/types";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import shallow from "zustand/shallow";

export const editTaskClient = async (data: EditTaskValidationParams) => {
  const res = await AxiosInstance.post<any, AxiosResponse<ApiResponse<MyTask>>>(
    "/tasks/edit",
    data
  );

  return res.data.data;
};

const useEditTask = () => {
  const user = useAuthStore((state) => state.user);

  const project = useProjectStore((state) => state.selectedProject, shallow);

  const { handleError } = useErrorStore();

  const { mutate, isLoading } = useMutation(editTaskClient, {
    onError: (err) => {
      handleError(err);
    },
  });

  const handleEditTask = async (data: EditTaskValidationParams) => {
    if (!user || !project) return;

    const adjustedData: EditTaskValidationParams = {
      ...data,
      projectId: project.id,
    };

    const ValidatedData = editTaskValidate(adjustedData);
    mutate(ValidatedData);
  };

  return {
    handleEditTask,
    isLoading,
  };
};

export default useEditTask;
