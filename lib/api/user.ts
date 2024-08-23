import { axiosInstance } from "@/lib/api";
import { setTokens } from "@/lib/api/token";
import { ApiResponse } from "@/types/api";
import { LoginRequest, LoginResponse } from "@/types/api/user";
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
}
