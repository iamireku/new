
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/contexts/auth-context';
import { NavProvider } from '@/contexts/nav-context'; // New context for nav state

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
});

const headlineFont = Inter({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: '700',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    default: 'Betweena | Secure Your Sale. Guarantee Your Payment.',
    template: '%s | Betweena',
  },
  description: 'Tired of being scammed online? Betweena protects both buyers and sellers by holding payments in secure escrow until the deal is done. Perfect for social commerce, freelancers, and small businesses in Africa.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Betweena | Secure Your Sale. Guarantee Your Payment.',
    description: 'The safest way to buy and sell online in Africa. Secure escrow for social commerce and freelancers.',
    url: siteUrl,
    siteName: 'Betweena',
    images: [
      {
        url: '/hero.png', // Main OG image
        width: 1200,
        height: 630,
        alt: 'A person completing a secure transaction on their phone with the Betweena app.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Betweena | Secure Your Sale. Guarantee Your Payment.',
    description: 'The safest way to buy and sell online in Africa. Secure escrow for social commerce and freelancers.',
    images: [`${siteUrl}/hero.png`],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(
        "font-sans antialiased min-h-screen",
        inter.variable,
        headlineFont.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NavProvider> {/* Wrap with NavProvider */}
              {children}
            </NavProvider>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
