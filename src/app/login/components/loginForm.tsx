'use client';

import React from 'react';
import {
  loginFormSchema,
  LoginFormType,
  onSubmit,
  loginFormInitialValues,
} from '@/schema/loginFormSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/PasswordInput';

export default function LoginForm() {
  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormInitialValues,
  });

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={loginForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='abc123@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder='Your password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='bg-tertiary text-tertiary-foreground hover:bg-tertiary-dark w-full'
          disabled={!loginForm.formState.isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
