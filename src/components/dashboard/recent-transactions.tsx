// /src/components/dashboard/recent-transactions.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/lib/data';

const TRANSACTIONS_PER_PAGE = 3;

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
    const [visibleTransactionsCount, setVisibleTransactionsCount] = useState(TRANSACTIONS_PER_PAGE);

    const getStatusText = (status: string) => {
        if (status === 'inHolding') return 'On Hold';
        if (status === 'in_review') return 'In Review';
        return status.replace('_', ' ');
    }

    const transactionsToShow = transactions.slice(0, visibleTransactionsCount);

    return (
        <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Transactions</CardTitle>
          <CardDescription>Your latest wallet transactions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {transactionsToShow.map((tx) => (
                <div key={tx.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        tx.type === 'incoming' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'
                    )}>
                        {tx.type === 'incoming' ? 
                            <ArrowDownLeft className="h-5 w-5 text-green-500" /> : 
                            <ArrowUpRight className="h-5 w-5 text-red-500" />
                        }
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold">{tx.description}</p>
                        <p className="text-sm text-muted-foreground">
                            {tx.type === 'incoming' ? 'From' : 'To'}: {tx.party}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className={cn("font-mono font-semibold", tx.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                            {tx.amount > 0 ? '+' : ''}GHS {Math.abs(tx.amount).toFixed(2)}
                        </p>
                        <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'} className={cn("mt-1", {
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': tx.status === 'completed',
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': tx.status === 'pending',
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': tx.status === 'inHolding'
                        })}>
                            {getStatusText(tx.status)}
                        </Badge>
                    </div>
                </div>
            ))}
        </CardContent>
        {transactions.length > visibleTransactionsCount && (
            <CardFooter className="justify-center border-t pt-4">
                <Button 
                    variant="outline" 
                    onClick={() => setVisibleTransactionsCount(prev => prev + TRANSACTIONS_PER_PAGE)}
                >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Load More
                </Button>
            </CardFooter>
        )}
      </Card>
    );
}
