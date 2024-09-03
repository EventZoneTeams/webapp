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
import { LoginRequest } from "@/types/api/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function SignInForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: SignInSchemaDefaultValue,
  });

  const onSubmit = async (data: SignInSchemaType) => {
    setIsLoading(true);
    User.login(data as LoginRequest)
      .then((response) => {
        if (response.isSuccess) {
          User.getMe().then((data) => {
            if (data.isSuccess) {
              router.push("/dashboard");
            }
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      </form>
    </Form>
  );
}
