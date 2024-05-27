import { axiosClient } from "@/api/axiosClient";
import { LoginFormType } from "@/schemas/loginFormSchema";
import { registerFormType } from "@/schemas/registerFromSchema";
import { GetMeResponse } from "@/types/authuser";
import { LoginResponse } from "@/types/loginFunction";
import { RegisterResponse } from "@/types/registerFunction";

interface RegisterSendData {
  email: string;
  password: string;
  fullName: string;
  dob: Date;
  gender: string;
}

export const login = async (data: LoginFormType) => {
  try {
    const response = await axiosClient.post("/users/login", data);
    return response.data as LoginResponse;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await axiosClient.get("/users/me");
    return response.data as GetMeResponse;
  } catch (error) {
    throw error;
  }
};
