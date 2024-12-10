'use client';

import './globals.css';
// import type { Metadata } from 'next';
import { Poppins, Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from './utils/ThemeProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Poppins',
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Josefin',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}
        className={`
          ${poppins.variable} ${josefin.variable} 
          antialiased !bg-white 
          duration-300
          bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black
        `}
      >
        <ThemeProvider >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}