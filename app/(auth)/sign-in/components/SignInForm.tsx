"use client";

import {
  SignInSchema,
  SignInSchemaDefaultValue,
  SignInSchemaType,
} from "@/app/(auth)/sign-in/components/signInSchema";
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
import { User } from "@/lib/api/user";
import { LoginRequest } from "@/types/api/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: SignInSchemaDefaultValue,
  });

  const onSubmit = async (data: SignInSchemaType) => {
    startTransition(() => {
      User.login(data as LoginRequest).then((response) => {
        if (response.isSuccess) {
          toast.success(response.message);

          User.getMe().then((data) => {
            if (data.isSuccess) {
              router.push("/discover");
            }
          });
        } else {
          toast.error(response.message);
        }
      });
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
                <Input
                  placeholder="Your email"
                  {...field}
                  className="bg-input-background/50"
                  type="email"
                />
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
                <Input
                  placeholder="Your password"
                  {...field}
                  type="password"
                  className="bg-input-background/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          isLoading={isPending}
          disabled={!form.formState.isValid}
        >
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
