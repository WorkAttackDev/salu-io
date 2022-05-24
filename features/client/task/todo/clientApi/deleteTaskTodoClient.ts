import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { ApiResponse } from "../../../../shared/types";
import { AxiosInstance } from "../../../core/config/client";
import { useErrorStore } from "../../../core/stores/errorStore";

export type DeleteTaskTodoParams = {
  taskid: string;
  todoId: string;
};

export default async function deleteTaskTodoClient({
  taskId,
  todoId,
}: DeleteTaskTodoParams) {
  const res = await AxiosInstance.delete<
    any,
    AxiosResponse<ApiResponse<boolean>>
  >(`/tasks/${taskId}/todos`, { data: { todoId } });
  return res.data.data;
}

export const useDeleteTaskTodoMutation = () => {
  const { handleError } = useErrorStore();

  return useMutation(
    (data: DeleteTaskTodoParams) => deleteTaskTodoClient(data),
    {
      onError: (err) => {
        handleError(err);
      },
    }
  );
};
