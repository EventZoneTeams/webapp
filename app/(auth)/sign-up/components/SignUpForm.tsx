"use client";

import {
  SignUpSchema,
  SignUpSchemaDefaultValue,
  SignUpSchemaType,
} from "@/app/(auth)/sign-up/components/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
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
import { DateTimePicker } from "@/components/input/DateTimePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "next-view-transitions";
import { Checkbox } from "@/components/ui/checkbox";
import { vi } from "date-fns/locale";
import { SignUpRequest } from "@/types/api/user";
import { User as UserService } from "@/lib/api/user";
import { toast } from "sonner";

export default function SignUpForm() {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: SignUpSchemaDefaultValue,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: SignUpSchemaType) => {
    startTransition(() => {
      const sendData: SignUpRequest = {
        email: data.email,
        fullName: data.fullName,
        dob: data.dob,
        gender: data.gender,
        password: data.password,
        confirmPassword: data.confirmPassword,
        imageUrl: "",
        workAt: "",
      };

      UserService.signUp(sendData).then((response) => {
        if (response.isSuccess) {
          toast.success(response.message);
          console.log(response);
        } else {
          toast.error(response.message);
          console.error(response);
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
              <FormLabel>
                Username
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  type="email"
                  className=""
                />
              </FormControl>
              <FormDescription>
                This will be used to login into your account
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  {...field}
                  type="text"
                  className=""
                />
              </FormControl>
              <FormDescription>This will be your display name</FormDescription>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center gap-4">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-1">
                <FormLabel>
                  Date of Birth
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={field.onChange}
                    yearRange={100}
                    hourCycle={24}
                    granularity="day"
                    displayFormat={{ hour24: "dd/MM/yyyy" }}
                    locale={vi}
                  />
                </FormControl>

                <FormDescription>Your Date of Birth</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col gap-1">
                <FormLabel>
                  Gender
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select your gender"
                          className=""
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background/50 backdrop-blur-3xl">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormDescription>Your Gender</FormDescription>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type="password"
                    className=""
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Re-enter your password"
                    {...field}
                    type="password"
                    className=""
                  />
                </FormControl>
                <FormDescription>
                  Please re-enter your password to confirm
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the terms and conditions
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>
                  Agree to{" "}
                  <Link
                    href="/examples/forms"
                    className="text-blue-500 hover:cursor-pointer hover:text-blue-400 hover:underline"
                  >
                    Terms and Conditions
                  </Link>{" "}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {!form.formState.isValid && form.formState.isSubmitted && (
          <ul className="mb-4 list-decimal rounded border border-red-500 bg-red-500/30 px-8 py-4 text-red-200 backdrop-blur-xl">
            {Object.values(form.formState.errors).map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        )}

        <Button type="submit" className="w-full">
          {isPending ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
