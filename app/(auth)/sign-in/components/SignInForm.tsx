"use client";

import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { User } from "@/lib/api/user";
import {
  SignInSchema,
  SignInSchemaDefaultValue,
  SignInSchemaType,
} from "@/schemas/signInSchema";
import { useAuthStore } from "@/stores/authStore";
import { LoginRequest } from "@/types/api/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignInForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { setUser } = useAuthStore();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: SignInSchemaDefaultValue,
  });

  const onSubmit = async (data: SignInSchemaType) => {
    setIsLoading(true);
    const loginResponse = await User.login(data as LoginRequest);
    if (loginResponse.isSuccess) {
      const userResponse = await User.getMe();
      if (userResponse.isSuccess && userResponse.data) {
        setUser(userResponse.data);
      } else {
        toast.error(userResponse.message);
      }
    } else {
      toast.error(loginResponse.message);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomFormField
          control={form.control}
          name="email"
          type="text"
          placeholder="Enter your email"
          label="Email"
        />
        <CustomFormField
          control={form.control}
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
        />
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          disabled={!form.formState.isValid}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
        <Button
          type="button"
          variant={"outline"}
          className="w-full"
          onClick={() => {
            User.refreshToken().then((response) => {
              if (response.isSuccess) {
                console.log(response.data);
                toast.success("Token refreshed successfully");
              } else {
                toast.error(response.message);
              }
            });
          }}
        >
          refreshToken
        </Button>
      </form>
    </Form>
  );
}
