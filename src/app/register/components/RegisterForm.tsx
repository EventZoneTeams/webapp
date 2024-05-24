'use client';

import React from 'react';
import {
  registerFormSchema,
  RegisterFormType,
  registerFormInitialValues,
} from '@/schemas/registerFormSchema';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { register } from '@/api/auth/register';
import { myToast } from '@/lib/toast';
import { RegisterResponse } from '@/types/registerFunction';
import { AxiosError } from 'axios';
import { navigate } from '@/lib/navigate';

export default function RegisterForm() {
  const RegisterForm = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: registerFormInitialValues,
  });

  const onSubmit = async (data: RegisterFormType) => {
    await register(data)
      .then((response: RegisterResponse) => {
        if (response.status) {
          myToast.success(response.message, 'Success');
          navigate('/login');
        } else {
          myToast.error(response.message, 'Error');
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.response);
        if (error.response?.data) {
          myToast.error(
            (error.response.data as RegisterResponse).message,
            'Error'
          );
        } else {
          myToast.error('An error occurred', 'Error');
        }
      });
  };

  return (
    <Form {...RegisterForm}>
      <form
        onSubmit={RegisterForm.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FormField
          control={RegisterForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='abc123@gmail.com' {...field} type='email' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-2'>
          <FormField
            control={RegisterForm.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder='Your full name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={RegisterForm.control}
            name='nickName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input placeholder='Nickname you like' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <FormField
            control={RegisterForm.control}
            name='dob'
            render={({ field }) => (
              <FormItem className='flex flex-1 flex-col'>
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={RegisterForm.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your gender?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex items-center'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Male' />
                      </FormControl>
                      <FormLabel className='font-normal'>Male </FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='Female' />
                      </FormControl>
                      <FormLabel className='font-normal'>Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='space-y-4'>
          <FormField
            control={RegisterForm.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center'>
                  <FormLabel className='flex-1'>Password</FormLabel>
                  <FormDescription>
                    Password must be at least 8 characters.
                  </FormDescription>
                </div>
                <FormControl>
                  <PasswordInput {...field} placeholder='Your password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={RegisterForm.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder='Confirm your password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={RegisterForm.control}
          name='agree'
          render={({ field }) => (
            <FormItem className='flex items-center gap-2 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className='font-normal '>
                By checking this box, you agree to our
                <Link href='/terms' className='ml-2 inline-block text-tertiary'>
                  Terms and Conditions
                </Link>
              </FormLabel>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full bg-tertiary text-tertiary-foreground hover:bg-tertiary-dark'
          disabled={!RegisterForm.formState.isValid}
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
