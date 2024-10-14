import { axiosInstance, handleApiError } from "@/lib/api";
import { getTokens, setTokens } from "@/lib/api/token";
import { useAuthStore } from "@/stores/authStore";
import { ApiResponse } from "@/types/api";
import {
  GetAllUserParams,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  SignUpRequest,
} from "@/types/api/user";
import { User as UserType } from "@/types/user";

export namespace User {
  export async function login(
    data: LoginRequest,
  ): Promise<ApiResponse<LoginResponse | null>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<LoginResponse>>(
          "/users/login",
          data,
        )
      ).data;

      console.log(response);
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
      return handleApiError(error);
    }
  }

  export async function getMe(): Promise<ApiResponse<UserType>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<UserType>>("/users/me")
      ).data;

      if (response.isSuccess && response.data) {
        useAuthStore.getState().setUser(response.data);
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

  export function signOut() {
    setTokens("", "");
    useAuthStore.getState().clearAuth();
  }

  export async function signUp(
    data: SignUpRequest,
  ): Promise<ApiResponse<UserType | null>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<UserType>>("/users/register", data)
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
    } catch (error) {
      return handleApiError(error);
    }
  }

  export async function getUserById(
    id: string,
  ): Promise<ApiResponse<UserType | null>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<UserType>>(`/users/${id}`)
      ).data;
      return response;
    } catch (error) {
      return {
        isSuccess: false,
        message: "Failed to get user by id",
        data: null,
      };
    }
  }

  export async function getAll(
    payload: GetAllUserParams,
  ): Promise<ApiResponse<UserType[] | null>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<UserType[]>>("/users", {
          params: payload,
        })
      ).data;
      return response;
    } catch (error) {
      return {
        isSuccess: false,
        message: "Failed to get all user",
        data: null,
      };
    }
  }
}
