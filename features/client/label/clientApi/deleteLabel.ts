import { AxiosResponse } from "axios";
import { DeleteLabelValidationParams } from "../../../shared/lib/validation/label/deleteLabel";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const deleteLabelClient = async (data: DeleteLabelValidationParams) => {
  const res = await AxiosInstance.delete<
    any,
    AxiosResponse<ApiResponse<boolean>>
  >("/labels/delete", {
    data: data,
  });

  return res.data.data;
};
