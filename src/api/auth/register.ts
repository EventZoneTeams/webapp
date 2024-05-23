import axiosClient from '@/api/axiosClient';
import { RegisterFormType } from '@/schemas/registerFormSchema';

type RegisterSendData = {
  email: string;
  password: string;
  fullName: string;
  dob: Date;
  gender: string;
};

export const register = async (data: RegisterFormType) => {
  try {
    const sendData: RegisterSendData = {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      dob: data.dob,
      gender: data.gender,
    };
    const response = await axiosClient.post('/users/register', sendData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
