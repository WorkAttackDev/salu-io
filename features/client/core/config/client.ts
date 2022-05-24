import axios from "axios";
import { HOST } from "../../../shared/utils";

export const AxiosInstance = axios.create({
  baseURL: HOST + "api/",
  withCredentials: true,
});
