'use client';

import React from 'react';
import {
  loginFormSchema,
  LoginFormType,
  onSubmit,
  loginFormInitialValues,
} from '@/schemas/loginFormSchema';
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
import Link from 'next/link';

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
              <div className='flex items-center gap-2'>
                <FormLabel className='flex-1'>Email</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder='abc123@gmail.com' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-2'>
                <FormLabel className='flex-1'>Password</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <PasswordInput {...field} placeholder='Your password' />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full bg-tertiary text-tertiary-foreground hover:bg-tertiary-dark'
          disabled={!loginForm.formState.isValid}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
