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
          <CardTitle className='text-center text-4xl'>Register</CardTitle>
        </CardHeader>

        <CardContent>{children}</CardContent>
        <CardFooter>
          <div className='flex justify-between gap-1'>
            <p>Already have an account? </p>
            <Link href='/login' className='text-tertiary underline'>
              Login
            </Link>
          </div>
        </CardFooter>
      </div>
    </div>
  );
}
