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
import { getMe, login, LoginResponse } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";

export default function LoginForm() {
  const router = useRouter();
  const { setJwt, setJwtRefreshToken } = useAuthStore();

  const loginFrom = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormType) => login(data),
    onSuccess: (data: LoginResponse) => {
      console.log(data);
      setJwt(data.jwt);
      setJwtRefreshToken(data["jwt-refresh-token"]);
      toast.success("Login successful");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    loginMutation.mutate(data);
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
                <Input
                  placeholder="abc@gmail.com"
                  {...field}
                  className=""
                  disabled={loginMutation.isPending}
                />
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
                <PasswordInput
                  {...field}
                  placeholder="Your password"
                  disabled={loginMutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!loginFrom.formState.isValid || loginMutation.isPending}
        >
          {loginMutation.isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
