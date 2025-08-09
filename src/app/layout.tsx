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

export const metadata: Metadata = {
  title: 'Betweena',
  description: 'Safe Payments for Your Business',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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
