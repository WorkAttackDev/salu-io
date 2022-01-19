import { AxiosResponse } from "axios";
import { MyProjectTasks } from "../../../shared/models/myProjectTasks";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const getProjectByIdClient = async (id: string) => {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<ApiResponse<MyProjectTasks>>
  >("/projects/" + id);
  return res.data.data;
};
