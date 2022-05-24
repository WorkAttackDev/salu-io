import { AxiosInstance } from "@/client/core/config/client";
import { useErrorStore } from "@/client/core/stores/errorStore";
import { MyProject } from "@/shared/models/myProjectTasks";
import { ApiResponse } from "@/shared/types";
import { AxiosResponse } from "axios";
import React from "react";
import { useQuery } from "react-query";
import useApi from "../../core/hooks/use_api";
import { useProjectStore } from "../stores/useProductsStore";

const getProjectByIdFn = async (id: string) => {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<ApiResponse<MyProject>>
  >("/projects/" + id);
  return res.data.data;
};

const useGetProject = (projectId?: string) => {
  const { handleError } = useErrorStore();

  const { data, isLoading } = useQuery(
    ["getProject", projectId],
    () => (projectId ? getProjectByIdFn(projectId) : undefined),
    {
      enabled: projectId !== undefined,
      onError: (err) => handleError(err),
    }
  );

  return {
    project: data,
    isLoading,
  };
};

export default useGetProject;
