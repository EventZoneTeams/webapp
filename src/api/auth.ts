import { axiosClient } from "@/api/axiosClient";
import { LoginFormType } from "@/schemas/loginFormSchema";
import { registerFormType } from "@/schemas/registerFromSchema";
import { User } from "@/types/authuser";
import { AxiosError } from "axios";

//Types
interface RegisterSendData {
  email: string;
  password: string;
  fullName: string;
  dob: Date;
  gender: string;
}

export type LoginResponse = {
  status: boolean;
  message: string;
  jwt: string;
  "jwt-refresh-token": string;
  expired: Date;
  "user-id": number;
};

export type RegisterResponse = {
  status: boolean;
  message: string;
  data?: User;
};

export type GetMeResponse = {
  status: boolean;
  message: string;
  data?: User;
};

export type RefreshTokenSendData = {
  "access-token": string;
  "refresh-token": string;
};

export type RefreshTokenResponse = {
  status: boolean;
  message: string;
  jwt: string;
  expired: Date;
  "jwt-refresh-token": string;
  "user-id": number;
};

//Functions
export const login = async (data: LoginFormType) => {
  try {
    const response = await axiosClient.post("/users/login", data);
    return response.data as LoginResponse;
  } catch (error: any) {
    const errorResponse = error as AxiosError<LoginResponse>;
    throw new Error(errorResponse.response?.data.message);
  }
};

export const register = async (data: registerFormType) => {
  const sendData: RegisterSendData = {
    email: data.email,
    password: data.password,
    fullName: data.fullName,
    dob: data.dob,
    gender: data.gender,
  };
  try {
    const response = await axiosClient.post("/users/register", sendData);
    return response.data as RegisterResponse;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getMe = async () => {
  try {
    const response = await axiosClient.get("/users/me");
    return response.data as GetMeResponse;
  } catch (error) {
    const errorResponse = error as AxiosError<GetMeResponse>;
    throw errorResponse;
  }
};

export const refreshToken = async (data: RefreshTokenSendData) => {
  try {
    const response = await axiosClient.post("/users/refresh-token", data);
    return response.data as RefreshTokenResponse;
  } catch (error) {
    throw new Error(error as string);
  }
};
