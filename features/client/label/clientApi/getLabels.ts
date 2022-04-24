import { AxiosResponse } from "axios";
import { MyLabel } from "../../../shared/models/MyLabel";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const getLabelsCLient = async () => {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<ApiResponse<MyLabel[]>>
  >("/labels");

  return res.data.data;
};
