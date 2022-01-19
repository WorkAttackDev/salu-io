import { Project } from "@prisma/client";
import { AxiosResponse } from "axios";
import { PaginatedApiResponse, SortBy } from "../../../shared/types";

import { AxiosInstance } from "../../core/config/client";
import { PAGINATION_LIMIT } from "../../project/stores/useProductsStore";

type GetBroasParams = {
  page?: number;
  limit?: number;
  name?: string;
  sortBy?: SortBy;
};

export const getTasksClient = async (params?: GetBroasParams) => {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<PaginatedApiResponse<Project[]>>
  >(
    `/tasks?limit=${params?.limit ?? PAGINATION_LIMIT}${
      params?.page ? "&page=" + params.page : ""
    }${params?.name ? "&name=" + params.name : ""}${
      params?.sortBy ? "&sortBy=" + params.sortBy : ""
    }`
  );

  return res.data.data;
};
