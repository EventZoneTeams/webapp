'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  { placeholder?: string }
>(({ placeholder, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className='relative'>
      <Input
        type={isVisible ? 'text' : 'password'}
        placeholder={placeholder}
        {...props}
        ref={ref}
      />
      <Button
        variant='ghost'
        type='button'
        onClick={() => setIsVisible((prev) => !prev)}
        className={cn(
          'absolute right-0 top-0 w-20 rounded-l-none bg-muted p-2'
        )}
      >
        {isVisible ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
