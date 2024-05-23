import { login } from '@/api/auth/login';
import z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { LoginResponseFromBackendServer } from '@/types/loginFunction';
import { AxiosError } from 'axios';

export const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export const loginFormInitialValues = {
  email: '',
  password: '',
};

export const onSubmit = async (data: LoginFormType) => {
  console.log(data);
};
