import { Broa, BroaReaction } from ".prisma/client";
import { AxiosResponse } from "axios";
import { BroaSortBy } from "../../shared/broas.types";
import { EditBroaValidationParams } from "../../shared/lib/validation/edit_broa_validator";
import { ToggleReactionValidatorParams } from "../../shared/lib/validation/toggleReactionValidate";
import { ApiResponse, PaginatedApiResponse } from "../../shared/types";
import { AxiosInstance } from "../core/config/client";
import {
  globalSetBroaPaginated,
  PAGINATION_LIMIT,
} from "./stores/useBroasStore";

type GetBroasParams = {
  page?: number;
  limit?: number;
  wrongVersion?: string;
  sortBy?: BroaSortBy;
};

export const getBroasClient = async (params?: GetBroasParams) => {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<PaginatedApiResponse<Broa[]>>
  >(
    `/broas?limit=${params?.limit ?? PAGINATION_LIMIT}${
      params?.page ? "&page=" + params.page : ""
    }${params?.wrongVersion ? "&wrongVersion=" + params.wrongVersion : ""}${
      params?.sortBy ? "&sortBy=" + params.sortBy : ""
    }`
  );

  globalSetBroaPaginated(res.data.data, res.data.pagination);

  return res.data.data;
};

export const getBroasByUserIdClient = async (
  userId: number,
  params?: GetBroasParams
) => {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<PaginatedApiResponse<Broa[]>>
  >(
    `/broas/${userId}/broas?limit=${params?.limit ?? PAGINATION_LIMIT}${
      params?.page ? "&page=" + params.page : ""
    }${params?.wrongVersion ? "&wrongVersion=" + params.wrongVersion : ""}${
      params?.sortBy ? "&sortBy=" + params.sortBy : ""
    }`
  );

  globalSetBroaPaginated(res.data.data, res.data.pagination);

  return res.data.data;
};

export const getBroaByIdClient = async (id: string) => {
  const res = await AxiosInstance.get<any, AxiosResponse<ApiResponse<Broa>>>(
    "/broas/" + id + "/broa"
  );
  return res.data.data;
};

export const createBroaClient = async (data: EditBroaValidationParams) => {
  const res = await AxiosInstance.post<any, AxiosResponse<ApiResponse<Broa>>>(
    "/broas/edit",
    data
  );

  return res.data.data;
};

export const updateBroaClient = async (
  id: number,
  data: EditBroaValidationParams
) => {
  const res = await AxiosInstance.post<any, AxiosResponse<ApiResponse<Broa>>>(
    "/broas/edit/" + id,
    data
  );

  return res.data.data;
};

export const deleteBroaClient = async (id: number, userId: number) => {
  const res = await AxiosInstance.delete<
    any,
    AxiosResponse<ApiResponse<boolean>>
  >("/broas/" + id, {
    data: { userId },
  });

  return res.data.data;
};

//* Reactions
export const toggleReactionClient = async (
  data: ToggleReactionValidatorParams
) => {
  const res = await AxiosInstance.post<
    any,
    AxiosResponse<ApiResponse<(BroaReaction & { broa?: Broa }) | null>>
  >("/broas/reaction", data);

  return res.data.data;
};
