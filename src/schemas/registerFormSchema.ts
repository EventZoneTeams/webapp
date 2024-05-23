import { register } from '@/api/auth/register';
import { toast } from '@/components/ui/use-toast';
import { RegisterResponse } from '@/types/registerResponse';
import { AxiosError } from 'axios';
import z from 'zod';

export const registerFormSchema = z
  .object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    nickName: z
      .string()
      .min(3, 'Your nick name must be at least 3 characters.'),
    fullName: z
      .string()
      .min(8, 'Your full name must be at least 4 characters.'),
    dob: z.date(),
    gender: z
      .string({ required_error: 'Gender is required' })
      .min(3, 'Gender is required'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters.'),
    agree: z.boolean({
      required_error: 'You must agree to the terms and conditions.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })
  .refine((data) => data.agree, {
    message: 'You must agree to the terms and conditions.',
    path: ['agree'],
  });

export type RegisterFormType = z.infer<typeof registerFormSchema>;

export const registerFormInitialValues = {
  email: '',
  nickName: '',
  fullName: '',
  dob: new Date(),
  password: '',
  gender: 'Male',
  confirmPassword: '',
  agree: false,
};

export const onSubmit = async (data: RegisterFormType) => {
  await register(data)
    .then((response: RegisterResponse) => {
      console.log(response);
      if (response.status) {
        toast({
          variant: 'success',
          title: 'Success',
          description: response.message,
        });
      }
    })
    .catch((error: AxiosError) => {
      toast({
        title: 'Error',
        variant: 'destructive',
        description:
          (error.response?.data as RegisterResponse).message || error.message,
      });
    });
};
