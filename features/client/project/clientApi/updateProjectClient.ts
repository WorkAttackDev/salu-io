import { Project } from "@prisma/client";
import { AxiosResponse } from "axios";
import { EditProjectValidationParams } from "../../../shared/lib/validation/editProjectValidator";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const updateProjectClient = async (
  projectId: number,
  data: EditProjectValidationParams
) => {
  const res = await AxiosInstance.post<
    any,
    AxiosResponse<ApiResponse<Project>>
  >("/projects/edit/" + projectId, data);

  return res.data.data;
};
