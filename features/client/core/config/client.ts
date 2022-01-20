import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../../../shared/types";
import { AuthRefreshTokenEndpoint } from "../../user/client";
import { globalSetToken, useAuthStore } from "../stores/authStore";
import { HOST } from "../utils";

export const AxiosInstance = axios.create({
  baseURL: HOST + "/api",
  withCredentials: true,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    config.headers!["Authorization"] = `Bearer ${token}`;
    return config;
  },
  async (err) => {
    return Promise.reject(err);
  }
);

AxiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const errConfig = err.config;

    if (err.response.status === 401 && !errConfig._retry) {
      errConfig._retry = true;

      try {
        const res = await AxiosInstance.get<
          any,
          AxiosResponse<ApiResponse<string>>
        >(AuthRefreshTokenEndpoint);

        globalSetToken(res.data.data);

        return AxiosInstance(errConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

// client calls
