import { axiosClient } from "@/api/axiosClient";
import { LoginFormType } from "@/schemas/loginFormSchema";
import { GetMeResponse } from "@/types/authuser";
import { LoginResponse } from "@/types/loginFunction";

export const login = async (data: LoginFormType) => {
  try {
    const response = await axiosClient.post("/users/login", data);
    return response.data as LoginResponse;
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
