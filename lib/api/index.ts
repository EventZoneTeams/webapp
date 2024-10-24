import { getAccessToken, getRefreshToken, setTokens } from "@/lib/api/token";
import { User } from "@/lib/api/user";
import { ApiResponse } from "@/types/api";
import axios, { AxiosError, AxiosInstance } from "axios";
export const BASE_URL = "https://eventzone-api.uydev.id.vn/api/v1";

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
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      console.log(refreshToken);
      if (refreshToken) {
        try {
          const response = await User.refreshToken();
          if (response.isSuccess && response.data) {
            setTokens(response.data.accessToken, response.data.refreshToken);
            axiosInstance.defaults.headers.common["Authorization"] =
              `Bearer ${response.data.accessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export function handleApiError(error: any): ApiResponse<null> {
  if (error instanceof AxiosError) {
    return {
      isSuccess: false,
      message:
        error.response?.data.message || error.message || "Axios error occurred",
      data: null,
    };
  } else {
    return {
      isSuccess: false,
      message: error.message || "An unknown error occurred",
      data: null,
    };
  }
}
