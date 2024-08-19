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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" isLoading={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
