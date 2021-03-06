import { AxiosResponse } from "axios";
import { MyProject } from "../../../shared/models/myProjectTasks";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const getProjectByIdClient = async (id: string) => {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<ApiResponse<MyProject>>
  >("/projects/" + id);
  return res.data.data;
};
