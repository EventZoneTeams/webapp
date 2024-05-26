"use client";

import React from "react";
import {
  loginFormDefaultValues,
  loginFormSchema,
  LoginFormType,
} from "@/schemas/loginFormSchema";
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
import PasswordInput from "@/components/ui/password-input";

export default function LoginForm() {
  const loginFrom = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
  });

  const onSubmit = (data: LoginFormType) => {
    console.log(data);
  };

  return (
    <Form {...loginFrom}>
      <form onSubmit={loginFrom.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={loginFrom.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abc@gmail.com" {...field} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginFrom.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="Your password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!loginFrom.formState.isValid}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
