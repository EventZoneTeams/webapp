import z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export const loginFormInitialValues = {
  email: '',
  password: '',
};

export function onSubmit(data: LoginFormType) {
  console.log(data);
}
