import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const deleteProjectClient = async (id: string, userId: string) => {
  const res = await AxiosInstance.delete<
    any,
    AxiosResponse<ApiResponse<boolean>>
  >("/projects/" + id, {
    data: { userId },
  });

  return res.data.data;
};
