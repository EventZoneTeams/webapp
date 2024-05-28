"use client";

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
import PasswordInput from "@/components/ui/password-input";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import { RegisterResponse } from "@/types/registerFunction";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  registerFormDefaultValues,
  registerFormSchema,
  registerFormType,
} from "@/schemas/registerFromSchema";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const registerForm = useForm<registerFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: registerFormDefaultValues,
  });

  const registerMutation = useMutation({
    mutationFn: (data: registerFormType) => register(data),
    onSuccess: (data: RegisterResponse) => {
      console.log(data);
      toast.success("Register successfully, please login to continue");
      router.push("/login");
    },
    onError: (error: AxiosError<RegisterResponse>) => {
      toast.error(error.response?.data.message);
    },
  });

  const onSubmit = (data: registerFormType) => {
    registerMutation.mutate(data);
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="abc@gmail.com"
                  {...field}
                  className=""
                  disabled={registerMutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nguyen Van A"
                  {...field}
                  className=""
                  disabled={registerMutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center">
          <FormField
            control={registerForm.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex items-center gap-2">
                  <FormLabel className="">Date of birth</FormLabel>
                  <FormDescription>( over 18 years old )</FormDescription>
                </div>
                <FormControl>
                  <CustomDatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4 justify-center items-center h-10"
                    disabled={registerMutation.isPending}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="male" />
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4 items-center">
                  <FormLabel>Password</FormLabel>
                  <FormDescription>
                    ( must be at least 6 characters )
                  </FormDescription>
                </div>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Your password"
                    disabled={registerMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Confirm your password"
                    disabled={registerMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={registerForm.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={registerMutation.isPending}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Agreement to the terms and conditions of the website
                </FormLabel>
                <FormDescription>
                  You can read the terms and conditions on the{" "}
                  <Link href="/examples/forms" className="text-blue-500">
                    terms and conditions
                  </Link>{" "}
                  page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={
            !registerForm.formState.isValid || registerMutation.isPending
          }
        >
          {registerMutation.isPending ? "Loading..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
