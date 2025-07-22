// /src/app/dashboard/layout.tsx
// /src/app/dashboard/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppLogo } from '@/components/AppLogo';
import { UserNav } from '@/components/UserNav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  User,
  LogOut,
  Menu,
  Handshake,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getDeals } from '@/lib/services/deals.service';
import type { Deal } from '@/lib/data';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/auth-context';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/deals', icon: Handshake, label: 'Deals' },
  { href: '/dashboard/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
];

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [deals, setDeals] = useState<Deal[]>([]);
  const { signOut } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const dealsData = await getDeals();
      setDeals(dealsData);
    }
    fetchData();
  }, []);

  const dealsNeedingAttentionCount = deals.filter(
    deal => deal.status === 'in_review' || deal.status === 'dispute'
  ).length;

  const sidebarNav = (
    <nav className="flex flex-col gap-2 px-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname.startsWith(item.href) ? 'default' : 'ghost'}
            className="w-full justify-start gap-2"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
            {item.label === 'Deals' && dealsNeedingAttentionCount > 0 && (
                <Badge className="ml-auto">{dealsNeedingAttentionCount}</Badge>
            )}
          </Button>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-20 items-center border-b px-6">
            <AppLogo isDashboard />
          </div>
          <div className="flex-1 overflow-auto py-2">
            {sidebarNav}
          </div>
          <div className="mt-auto p-4">
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-20 items-center gap-4 border-b bg-card px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <div className="flex h-20 items-center border-b px-6">
                    <AppLogo isDashboard />
                </div>
                <div className="py-2">
                 {sidebarNav}
                </div>
                <div className="mt-auto p-4 border-t">
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <UserNav />
        </header>
        <main className="flex-1 overflow-auto bg-secondary p-4 md:p-6">
            {children}
        </main>
      </div>
    </div>
  );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ProtectedRoute>
  );
}
