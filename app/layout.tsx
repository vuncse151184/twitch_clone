"use client";


import { ClerkProvider } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import './globals.css';
import { dark } from '@clerk/themes';
import { ThemeProvider } from '@/components/theme-provider';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ClerkProvider = dynamic(
    () => import('@clerk/nextjs').then(mod => mod.ClerkProvider),
    { ssr: false }
  );

  return (
    <html lang="en" className="dark">
      <body>
        <ClerkProvider appearance={{ baseTheme: dark }} signInFallbackRedirectUrl="/">
          <ThemeProvider
            attribute='class'
            forcedTheme='dark'
            storageKey="gamehub-theme"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
