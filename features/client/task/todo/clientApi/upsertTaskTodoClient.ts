import { TaskTodo } from "@prisma/client";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import {
  MyTaskTodo,
  MyTaskTodoSchemaParams,
} from "../../../../shared/models/MyTaskTodo";
import { ApiResponse } from "../../../../shared/types";
import { AxiosInstance } from "../../../core/config/client";
import { useErrorStore } from "../../../core/stores/errorStore";

export default async function upsertTaskTodoClient({
  taskId,
  text,
  todoId,
  done,
}: MyTaskTodoSchemaParams) {
  const res = await AxiosInstance.post<
    any,
    AxiosResponse<ApiResponse<MyTaskTodo>>
  >(`/tasks/${taskId}/todos`, { text, todoId, done });
  return res.data.data;
}

export const useUpsertTaskTodosMutation = () => {
  const { handleError } = useErrorStore();

  return useMutation(
    (data: MyTaskTodoSchemaParams) => upsertTaskTodoClient(data),
    {
      onError: (err) => {
        handleError(err);
      },
    }
  );
};
