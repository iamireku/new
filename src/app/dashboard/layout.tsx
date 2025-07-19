'use client';

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

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/deals', icon: Handshake, label: 'Deals' },
  { href: '/dashboard/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
];

// Mock data to simulate fetching deals that need attention.
// In a real app, this would be fetched from a server.
const dealsData = [
    { id: 'DEAL001', title: 'E-commerce Platform Development', party: 'ClientCorp', date: '2023-10-26', amount: 15000, status: 'completed', role: 'seller' },
    { id: 'DEAL002', title: 'Brand Identity Design', party: 'Creative LLC', date: '2023-10-22', amount: 3500, status: 'completed', role: 'buyer' },
    { id: 'DEAL003', title: 'Mobile App UI/UX', party: 'Appify Inc.', date: '2023-11-05', amount: 8000, status: 'in_escrow', role: 'seller' },
    { id: 'DEAL004', title: 'SEO & Content Strategy', party: 'Growth Co.', date: '2023-11-10', amount: 2500, status: 'funding', role: 'buyer' },
    { id: 'DEAL005', title: 'API Integration Services', party: 'ConnectAll', date: '2023-11-12', amount: 6000, status: 'dispute', role: 'seller' },
    { id: 'DEAL006', title: 'Q4 Marketing Campaign', party: 'AdVantage', date: '2023-11-15', amount: 12000, status: 'in_escrow', role: 'buyer' },
    { id: 'DEAL007', title: 'Cloud Migration', party: 'Serverless Solutions', date: '2023-11-20', amount: 25000, status: 'cancelled', role: 'seller' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const dealsNeedingAttentionCount = dealsData.filter(
    deal => deal.status === 'funding' || deal.status === 'dispute'
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
             <Link href="/login">
                <Button variant="ghost" className="w-full justify-start gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </Link>
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
                    <Link href="/login">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </Link>
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
