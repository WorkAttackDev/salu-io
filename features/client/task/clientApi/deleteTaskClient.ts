import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const deleteTaskClient = async (id: string) => {
  const res = await AxiosInstance.delete<
    any,
    AxiosResponse<ApiResponse<boolean>>
  >("/tasks/" + id);

  return res.data.data;
};
