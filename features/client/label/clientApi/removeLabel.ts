import { AxiosResponse } from "axios";
import { RemoveLabelValidationParams } from "../../../shared/lib/validation/label/removeLabel";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const removeLabelClient = async (data: RemoveLabelValidationParams) => {
  const res = await AxiosInstance.delete<
    any,
    AxiosResponse<ApiResponse<boolean>>
  >("/labels", {
    data: data,
  });

  return res.data.data;
};
