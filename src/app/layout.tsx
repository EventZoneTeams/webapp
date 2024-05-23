import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
('@/components/Header');

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Event Zone',
  description: 'Student Event Forum',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className='h-[2000px] pt-20'>{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
