// /src/components/AppLogo.tsx
// /src/components/AppLogo.tsx
import Image from 'next/image';
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
      <Image 
        src="/logo.png"
        alt="Betweena Logo"
        width={32}
        height={32}
        className="rounded-lg"
      />
      <span className="font-headline">Betweena</span>
    </Link>
  );
}
