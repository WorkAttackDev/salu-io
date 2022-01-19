import { Project } from "@prisma/client";
import { AxiosResponse } from "axios";
import { PaginatedApiResponse } from "../../../shared/types";
import {
  PAGINATION_LIMIT,
  globalSetProjectPaginated,
} from "../stores/useProductsStore";
import { AxiosInstance } from "../../core/config/client";

type GetBroasParams = {
  page?: number;
  limit?: number;
  name?: string;
  sortBy?: string;
};

export const getProjectsClient = async (params?: GetBroasParams) => {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<PaginatedApiResponse<Project[]>>
  >(
    `/projects?limit=${params?.limit ?? PAGINATION_LIMIT}${
      params?.page ? "&page=" + params.page : ""
    }${params?.name ? "&name=" + params.name : ""}${
      params?.sortBy ? "&sortBy=" + params.sortBy : ""
    }`
  );

  globalSetProjectPaginated(res.data.data, res.data.pagination);

  return res.data.data;
};
