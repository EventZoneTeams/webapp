import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-center py-10'>
      <div className={cn('w-[500px] border-none')}>
        <CardHeader>
          <CardTitle className='text-center text-4xl'>Login</CardTitle>
          {/* <CardDescription>
            Welcome back! Login to your account.
          </CardDescription> */}
        </CardHeader>

        <CardContent>{children}</CardContent>

        <CardFooter>
          <div className='flex w-full justify-between gap-1'>
            <div className='flex gap-1'>
              <p>Not a member yet? </p>
              <Link href='/register' className='text-tertiary underline'>
                Register
              </Link>
            </div>
            <Link href='/forgot-password' className='text-tertiary underline'>
              Forgot password?
            </Link>
          </div>
        </CardFooter>
      </div>
    </div>
  );
}
