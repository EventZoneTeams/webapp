import { ApiResponse } from "@/types/api";
import { LoginRequest, LoginResponse } from "@/types/api/login";

export async function login(
  data: LoginRequest,
): Promise<ApiResponse<LoginResponse>> {
  try {
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const responseData: ApiResponse<LoginResponse> = await response.json();

    if (!responseData.isSuccess) {
      return {
        isSuccess: false,
        message: responseData.message,
        data: null,
      };
    }

    return {
      isSuccess: true,
      message: "Login successful",
      data: responseData.data,
    };
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error.message || "Failed to login",
      data: null,
    };
  }
}
