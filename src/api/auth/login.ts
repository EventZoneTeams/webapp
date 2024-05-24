'use server';

import axiosClient from '@/api/axiosClient';
import { LoginFormType } from '@/schemas/loginFormSchema';
import { LoginResponse } from '@/types/loginFunction';

export async function login(data: LoginFormType) {
  try {
    return (await axiosClient.post('/users/login', data)).data as LoginResponse;
  } catch (error) {
    throw error;
  }
}
