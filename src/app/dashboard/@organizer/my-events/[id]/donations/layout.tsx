import { Metadata } from 'next';
import { title } from 'process'
import React from 'react'

export const metadata: Metadata = {
    title: "Donations",
  };

export default function layout(
    {children}: { children: React.ReactNode }
) {
  return children
}
