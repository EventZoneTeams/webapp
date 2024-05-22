import axiosClient from '@/api/axiosClient';
import { LoginFormType } from '@/schema/loginFormSchema';

export const login = async (data: LoginFormType) => {
  try {
    const response = await axiosClient.post('/api/v1/users/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
