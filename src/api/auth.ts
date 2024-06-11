import { axiosClient } from "@/api/axiosClient";
import { LoginFormType } from "@/schemas/loginFormSchema";
import { registerFormType } from "@/schemas/registerFromSchema";
import { User } from "@/types/authuser";

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

export const login = async (data: LoginFormType) => {
  try {
    const response = await axiosClient.post("/users/login", data);
    return response.data as LoginResponse;
  } catch (error) {
    throw new Error(error as string);
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
    throw new Error(error as string);
  }
};
