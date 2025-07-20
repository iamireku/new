// /src/components/AppLogo.tsx
import { Handshake } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AppLogoProps {
  className?: string;
  isDashboard?: boolean;
}

export function AppLogo({ className, isDashboard = false }: AppLogoProps) {
  return (
    <Link
      href={isDashboard ? "/dashboard" : "/"}
      className={cn("flex items-center gap-2.5 text-xl font-bold text-foreground", className)}
    >
      <div className="rounded-lg bg-primary p-2">
        <Handshake className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="font-headline">Betweena</span>
    </Link>
  );
}
