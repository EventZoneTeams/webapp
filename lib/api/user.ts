import { axiosInstance } from "@/lib/api";
import {
  getAccessToken,
  getRefreshToken,
  getTokens,
  setTokens,
} from "@/lib/api/token";
import { ApiResponse } from "@/types/api";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "@/types/api/user";
import { User as Usertype } from "@/types/user";

export namespace User {
  export async function login(
    data: LoginRequest,
  ): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<LoginResponse>>(
          "/users/login",
          data,
        )
      ).data;

      if (response.isSuccess && response.data) {
        setTokens(response.data.accessToken, response.data.refreshToken);
        return {
          isSuccess: true,
          message: response.message,
          data: response.data,
        };
      } else {
        throw new Error(response.message || "An error occurred");
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message,
        data: null,
      };
    }
  }

  export async function getMe(): Promise<ApiResponse<Usertype>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<Usertype>>("/users/me")
      ).data;

      if (response.isSuccess && response.data) {
        return {
          isSuccess: true,
          message: response.message,
          data: response.data,
        };
      } else {
        throw new Error(response.message || "An error occurred");
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message,
        data: null,
      };
    }
  }

  export async function refreshToken(): Promise<
    ApiResponse<RefreshTokenResponse>
  > {
    try {
      const { accessToken, refreshToken } = getTokens();

      if (!accessToken || !refreshToken) {
        throw new Error("No token found");
      }
      const response = (
        await axiosInstance.post<ApiResponse<RefreshTokenResponse>>(
          "/users/refresh-token",
          {
            accessToken,
            refreshToken,
          },
        )
      ).data;

      if (response.isSuccess && response.data) {
        setTokens(response.data.accessToken, response.data.refreshToken);
        return {
          isSuccess: true,
          message: response.message,
          data: response.data,
        };
      } else {
        throw new Error(response.message || "An error occurred");
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message,
        data: null,
      };
    }
  }
}
