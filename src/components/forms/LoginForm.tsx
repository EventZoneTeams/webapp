"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import useAuth from "@/hooks/useAuth";
import {
  loginFormDefaultValues,
  loginFormSchema,
  LoginFormType,
} from "@/schemas/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { loginMutation } = useAuth();

  const loginFrom = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
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
