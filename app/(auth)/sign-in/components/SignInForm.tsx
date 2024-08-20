"use client";

import {
  SignInSchema,
  SignInSchemaDefaultValue,
  SignInSchemaType,
} from "@/schemas/signInSchema";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api/login";
import { LoginRequest } from "@/types/api/login";
import CustomFormField from "@/components/CustomFormField";

export default function SignInForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: SignInSchemaDefaultValue,
  });

  const onSubmit = async (data: SignInSchemaType) => {
    setIsLoading(true);
    login({
      email: data.email,
      password: data.password,
    } as LoginRequest).then((response) => {
      if (response.isSuccess) {
        console.log(response.data);
        setIsLoading(false);
      } else {
        console.log(response.message);
        setIsLoading(false);
      }
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
        <Button type="submit" className="w-full" isLoading={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
