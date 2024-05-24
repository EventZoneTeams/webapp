import axiosClient from '@/api/axiosClient';
import { UserResponse } from '@/types/loginFunction';

export async function me() {
  try {
    return (await axiosClient.get('/users/me')).data as UserResponse;
  } catch (error) {
    throw error;
  }
}
