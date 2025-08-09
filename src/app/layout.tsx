// /src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';
import './globals.css';

// Font configurations (optimized to avoid duplication)
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap', // Optional: improves font loading performance
});

const headlineFont = Inter({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: '700',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Betweena',
    template: '%s | Betweena', // Better for dynamic titles (e.g., per-page)
  },
  description: 'Safe Payments for Your Business',
  metadataBase: new URL('https://yourdomain.com'), // Required for OG tags
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={cn(inter.variable, headlineFont.variable)}
    >
      <body className={cn(
        "min-h-screen font-sans antialiased bg-background text-foreground",
        inter.className // Ensures fallback font is applied
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster /> {/* Moved inside AuthProvider for potential toast auth checks */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}