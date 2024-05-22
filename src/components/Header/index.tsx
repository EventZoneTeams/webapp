'use client';

import React from 'react';
import { MenuItem } from '@/types/menu-item';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const menuItems: MenuItem[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Events',
    href: '/events',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

export default function Header() {
  const currentTheme = useTheme().theme;
  const currentPath = usePathname();

  return (
    <header className='fixed top-0 flex w-screen justify-center border-b-[1px] border-accent backdrop-blur-3xl'>
      <div className='flex h-16 items-center  2xl:w-[1200px]'>
        <div className='flex flex-1 items-center gap-6 '>
          <div>
            <Link href={'/'} className='flex'>
              <Image
                src='/images/logo-noText.svg'
                width={40}
                height={40}
                alt='logo'
              />
              {/* {currentTheme === 'light' ? (
                <Image
                  src='/images/text-black.svg'
                  width={100}
                  height={40}
                  alt='logo text'
                />
              ) : (
                <Image
                  src='/images/text-white.svg'
                  width={100}
                  height={40}
                  alt='logo text'
                />
              )} */}
            </Link>
          </div>
          <div className='flex items-center gap-0'>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'hover:text-tertiary  border-b-2 border-transparent px-6 py-2 text-primary transition-all',
                  currentPath === item.href
                    ? 'text-tertiary border-tertiary'
                    : ''
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <Link href={'/login'}>
            <Button variant={'ghost'}>Login</Button>
          </Link>
          <Link href={'/register'}>
            <Button variant={'default'}>Register</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}