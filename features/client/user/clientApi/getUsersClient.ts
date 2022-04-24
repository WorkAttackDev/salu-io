import { AxiosResponse } from "axios";
import { MyUserInfo } from "../../../shared/models/myUser";
import { ApiResponse } from "../../../shared/types";
import { AxiosInstance } from "../../core/config/client";

export const getUsersClient = async () => {
  const res = await AxiosInstance.get<
    any,
    AxiosResponse<ApiResponse<MyUserInfo[]>>
  >("/auth/users");

  return res.data.data;
};
