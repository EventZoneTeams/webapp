import { getAccessToken } from "@/lib/api/token";
import axios, { AxiosError, AxiosInstance } from "axios";
export const BASE_URL = "https://api.eventzone.id.vn/api/v1";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  },
);
