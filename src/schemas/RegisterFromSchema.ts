import z from "zod";

export const registerFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    dob: z.date(),
    gender: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      const age = new Date().getFullYear() - new Date(data.dob).getFullYear();
      return age >= 18;
    },
    {
      message: "You must be at least 18 years old",
      path: ["dob"],
    }
  );

export type registerFormType = z.infer<typeof registerFormSchema>;

export const registerFormDefaultValues: registerFormType = {
  email: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  dob: new Date(),
  gender: "male",
};
