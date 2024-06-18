import { axiosClient } from "@/api/axiosClient";
import { LoginFormType } from "@/schemas/loginFormSchema";
import { registerFormType } from "@/schemas/registerFromSchema";
import { User } from "@/types/authuser";
import { AxiosError } from "axios";

//Types
interface RegisterSendData {
  email: string;
  password: string;
  "full-name": string;
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
  data?: {
    id: number;
    email: string;
    "unsign-full-name": string;
    "full-name": string;
    dob: Date;
    gender: string;
    image: string;
    university: string;
    "is-deleted": boolean;
    "role-name": string;
    role: number | null;
  };
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
    const response = (
      await axiosClient.post<LoginResponse>("/users/login", data)
    ).data;
    return response;
  } catch (error: any) {
    const errorResponse = error as AxiosError<LoginResponse>;
    throw new Error(errorResponse.response?.data.message);
  }
};

export const register = async (data: registerFormType) => {
  const sendData: RegisterSendData = {
    email: data.email,
    password: data.password,
    "full-name": data.fullName,
    dob: data.dob,
    gender: data.gender,
  };
  try {
    const response = (
      await axiosClient.post<RegisterResponse>("/users/register", sendData)
    ).data;
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getMe = async () => {
  try {
    const response = (await axiosClient.get<GetMeResponse>("/users/me")).data;
    return response;
  } catch (error) {
    const errorResponse = error as AxiosError<GetMeResponse>;
    throw errorResponse;
  }
};

export const refreshToken = async (data: RefreshTokenSendData) => {
  try {
    const response = (
      await axiosClient.post<RefreshTokenResponse>("/users/refresh-token", data)
    ).data;
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};
