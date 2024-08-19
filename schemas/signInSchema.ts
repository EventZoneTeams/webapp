import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignInSchemaDefaultValue: SignInSchemaType = {
  email: "",
  password: "",
};
