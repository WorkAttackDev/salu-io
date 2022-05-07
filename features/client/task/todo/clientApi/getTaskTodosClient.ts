import { TaskTodo } from "@prisma/client";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { ApiResponse } from "../../../../shared/types";
import { AxiosInstance } from "../../../core/config/client";
import { useErrorStore } from "../../../core/stores/errorStore";

export default async function getTaskTodosClient({
  taskId,
}: {
  taskId: number;
}) {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<ApiResponse<TaskTodo[]>>
  >(`/tasks/${taskId}/todos`);
  return res.data.data;
}

export const useTaskTodosQuery = ({ taskId }: { taskId: number }) => {
  const { handleError } = useErrorStore();

  const query = useQuery("getTaskTodos", () => getTaskTodosClient({ taskId }), {
    initialData: [],
    enabled: false,
    onError: (err) => handleError(err),
  });

  return { ...query, queryKey: "getTaskTodos" };
};
