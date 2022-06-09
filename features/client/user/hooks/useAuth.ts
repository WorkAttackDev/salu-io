import { AxiosInstance } from "@/client/core/config/client";
import { ApiResponse } from "@workattackdev/wdk/lib/core";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { MyUser } from "../../../shared/models/myUser";

const useAuth = () => {
  const { isLoading, data } = useQuery<MyUser | null, AxiosError>(
    "getUser",
    async () => {
      return (await AxiosInstance.get<ApiResponse<MyUser | null>>("/auth/me"))
        .data.data;
    },
    {
      retry: 2,
      onError: (err) => console.log(err.message),
    }
  );

  return {
    isLoading,
    user: data,
  };
};

export default useAuth;
