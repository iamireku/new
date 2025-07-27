// /src/app/dashboard/wallet/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, ChevronDown, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import type { Transaction } from '@/lib/data';
import { getRecentTransactions } from '@/lib/services/wallet.service';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function WalletPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        async function fetchData() {
            const transactionsData = await getRecentTransactions();
            setTransactions(transactionsData);
        }
        fetchData();
    }, []);

    const moneyOnHold = transactions
        .filter(tx => tx.status === 'inHolding')
        .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">Escrow &amp; Payouts</h1>
        <p className="text-muted-foreground">Manage funds in active deals and view your transaction history.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Money on Hold</CardTitle>
              <CardDescription>This is the total amount currently held in escrow for your active deals.</CardDescription>
            </div>
            <Landmark className="h-6 w-6 text-muted-foreground"/>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">GHS {moneyOnHold.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A record of your money movements related to deals.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
            {transactions.map((tx) => (
              <Collapsible key={tx.id} asChild>
                <Card>
                  <CollapsibleTrigger asChild>
                    <button className="flex w-full items-center justify-between p-4 group">
                      <div className="flex items-center gap-4 text-left">
                        {tx.type === 'incoming' ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                            <ArrowDownLeft className="h-5 w-5 text-green-500" />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                            <ArrowUpRight className="h-5 w-5 text-red-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{tx.description}</p>
                           <p className="text-sm text-muted-foreground">
                            {tx.type === 'incoming' ? 'From' : 'To'}: {tx.party}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={cn("font-mono font-semibold", tx.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                            {tx.amount > 0 ? '+' : '-'}GHS {Math.abs(tx.amount).toLocaleString()}
                          </p>
                          <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'} className={cn("mt-1", {'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': tx.status === 'completed', 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': tx.status === 'pending', 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': tx.status === 'inHolding'})}>
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1).replace('_', ' ')}
                          </Badge>
                        </div>
                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 space-y-2">
                        <Separator/>
                        <p className="text-sm text-muted-foreground pt-2">{tx.description} with {tx.party}.</p>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
