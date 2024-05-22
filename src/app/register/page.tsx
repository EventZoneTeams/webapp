import RegisterForm from '@/app/register/components/RegisterForm';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

export default function Login() {
  return (
    <div>
      <RegisterForm />
      <div className='my-4 flex w-full items-center gap-8'>
        <div className='h-[1px] flex-1 bg-muted'></div>
        <p className='text-sm font-normal text-primary'>Or continute with</p>
        <div className='h-[1px] flex-1 bg-muted'></div>
      </div>
      <div className='my-2'>
        <Button variant='outline' className='w-full'>
          <Image
            src='/images/google_logo.svg'
            alt='Google Logo'
            width={20}
            height={20}
            className='mr-2'
          />
          <span>Continue with Google</span>
        </Button>
      </div>
    </div>
  );
}
