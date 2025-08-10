// /src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Deal, Transaction, LeaderboardUser, CurrentUser } from '@/lib/data';
import { getCurrentUser, getLeaderboard } from '@/lib/services/user.service';
import { getDeals } from '@/lib/services/deals.service';
import { getRecentTransactions } from '@/lib/services/wallet.service';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { ReferralRanks } from '@/components/dashboard/referral-ranks';
import { AttentionDeals } from '@/components/dashboard/attention-deals';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';

interface DashboardData {
    currentUser: CurrentUser;
    deals: Deal[];
    transactions: Transaction[];
    leaderboard: LeaderboardUser[];
}

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        async function fetchDashboardData() {
            const [currentUser, deals, transactions, leaderboard] = await Promise.all([
                getCurrentUser(),
                getDeals(),
                getRecentTransactions(),
                getLeaderboard(),
            ]);
            setData({ currentUser, deals, transactions, leaderboard });
        }
        fetchDashboardData();
    }, []);
    
    if (!data) {
        return <div>Loading dashboard...</div>; // Replace with a proper skeleton loader later
    }

    const { currentUser, deals, transactions, leaderboard } = data;
    const dealsNeedingAttention = deals.filter(
        deal => deal.status === 'dispute' || deal.status === 'in_review'
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild>
                <Link href="/dashboard/deals/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Start a New Deal
                </Link>
            </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1 lg:col-span-1">
          <SummaryCards />
        </div>
        <div className="md:col-span-1 lg:col-span-2">
          <ReferralRanks leaderboard={leaderboard} currentUser={currentUser} />
        </div>
      </div>
      
      <AttentionDeals deals={dealsNeedingAttention} />

      <RecentTransactions transactions={transactions} />
    </div>
  );
}
