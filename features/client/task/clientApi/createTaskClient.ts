import { Task } from "@prisma/client";
import { AxiosResponse } from "axios";
import { EditTaskValidationParams } from "../../../shared/lib/validation/editTaskValidator";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const editTaskClient = async (data: EditTaskValidationParams) => {
  const res = await AxiosInstance.post<any, AxiosResponse<ApiResponse<Task>>>(
    "/tasks/edit",
    data
  );

  return res.data.data;
};
