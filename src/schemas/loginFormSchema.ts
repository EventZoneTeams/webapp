import { login } from '@/api/auth/login';
import z from 'zod';
import { LoginResponse } from '@/types/loginFunction';
import { AxiosError } from 'axios';
import { myToast } from '@/lib/toast';
import { navigate } from '@/lib/navigate';

export const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export const loginFormInitialValues = {
  email: '',
  password: '',
};

export async function onSubmit(data: LoginFormType) {
  await login(data)
    .then((response: LoginResponse) => {
      if (response.status) {
        myToast.success(response.message, 'Success');
        navigate('/dashboard');
      } else {
        myToast.error(response.message, 'Error');
      }
    })
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        myToast.error((error.response.data as LoginResponse).message, 'Error');
      } else {
        myToast.error('An error occurred', 'Error');
      }
    });
}
