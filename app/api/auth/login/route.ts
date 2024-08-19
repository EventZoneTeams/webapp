import { BASE_URL } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { LoginRequest, LoginResponse } from "@/types/api/login";
import { NextRequest, NextResponse } from "next/server";

interface BackendLoginResponse {
  status: boolean;
  message: string;
  jwt: string;
  expired: Date;
  jwtRefreshToken: string;
  userId: string;
}

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as LoginRequest;

  if (!email || !password) {
    return NextResponse.json<ApiResponse<null>>(
      {
        isSuccess: false,
        message: "Email and password are required",
        data: null,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data: BackendLoginResponse = await response.json();

    const nextResponse = NextResponse.json<ApiResponse<LoginResponse>>({
      isSuccess: true,
      message: null,
      data: {
        accessToken: data.jwt,
        refreshToken: data.jwtRefreshToken,
      },
    });

    nextResponse.cookies.set("accessToken", data.jwt, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 15,
      path: "/",
    });

    nextResponse.cookies.set("refreshToken", data.jwtRefreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    return NextResponse.json<ApiResponse<null>>(
      {
        isSuccess: false,
        message: (error as Error).message,
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
