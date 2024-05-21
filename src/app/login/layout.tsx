import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-center py-10'>
      <Card className='w-[500px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Welcome back! Login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <div className='flex justify-between gap-1'>
            <p>Not a member yet? </p>
            <Link href='/register' className='text-tertiary underline'>
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
