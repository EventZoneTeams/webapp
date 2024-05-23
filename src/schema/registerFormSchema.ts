import z from 'zod';

export const registerFormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  nickName: z.string().min(3, 'Your nick name must be at least 3 characters.'),
  fullName: z.string().min(8, 'Your full name must be at least 4 characters.'),
  dob: z.date(),
  gender: z
    .string({ required_error: 'Gender is required' })
    .min(3, 'Gender is required'),
});

export type RegisterFormType = z.infer<typeof registerFormSchema>;

export const registerFormInitialValues = {
  email: '',
  password: '',
  nickName: '',
  fullName: '',
  dob: new Date(),
  gender: '',
};

export function onSubmit(data: RegisterFormType) {
  console.log(data);
}
