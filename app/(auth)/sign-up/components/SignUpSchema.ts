import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    fullName: z.string().min(3),
    dob: z.date(),
    gender: z.enum(["male", "female"]),
    agree: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must be the same",
  })
  .refine((data) => data.agree, {
    message: "You must agree to the terms and conditions",
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SignUpSchemaDefaultValue: SignUpSchemaType = {
  email: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  gender: "male",
  dob: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
  agree: false,
};
