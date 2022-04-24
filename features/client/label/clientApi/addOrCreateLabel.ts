import { AxiosResponse } from "axios";
import { AddOrCreateLabelValidationParams } from "../../../shared/lib/validation/label/addOrCreateLabel";
import { MyLabel } from "../../../shared/models/MyLabel";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const addOrCreateLabelClient = async (
  data: AddOrCreateLabelValidationParams
) => {
  const res = await AxiosInstance.post<
    any,
    AxiosResponse<ApiResponse<MyLabel>>
  >("/labels/create", data);

  return res.data.data;
};
