import { AxiosResponse } from "axios";
import { EditLabelValidationParams } from "../../../shared/lib/validation/label/editLabel";
import { MyLabel } from "../../../shared/models/MyLabel";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const editLabelClient = async (data: EditLabelValidationParams) => {
  const res = await AxiosInstance.post<
    any,
    AxiosResponse<ApiResponse<MyLabel>>
  >("/labels/" + data.id, data);

  return res.data.data;
};
