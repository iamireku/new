// /src/components/dashboard/summary-cards.tsx
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wallet, Landmark } from 'lucide-react';

export function SummaryCards() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-headline">Your Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">GHS 12,345.67</div>
          <p className="text-xs text-muted-foreground">Up 20.1% this month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-headline">Money on Hold</CardTitle>
          <Landmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">GHS 5,000.00</div>
          <p className="text-xs text-muted-foreground">In 3 active deals</p>
        </CardContent>
      </Card>
    </>
  );
}
