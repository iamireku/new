// /src/components/dashboard/attention-deals.tsx
// /src/components/dashboard/attention-deals.tsx
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, Handshake, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Deal } from '@/lib/data';

interface AttentionDealsProps {
    deals: Deal[];
}

export function AttentionDeals({ deals }: AttentionDealsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Deals Needing Your Attention</CardTitle>
                <CardDescription>
                    These deals require an action from you to proceed.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {deals.length > 0 ? (
                    <div className="space-y-4">
                        {deals.map((deal) => (
                            <div key={deal.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                     <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                                        deal.status === 'in_review' ? 'bg-purple-100 dark:bg-purple-900/50' : 'bg-red-100 dark:bg-red-900/50'
                                    )}>
                                        {deal.status === 'in_review' ? <Eye className='text-purple-500' /> : <AlertCircle className='text-red-500'/>}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{deal.title}</p>
                                        <p className="text-sm text-muted-foreground">
                                            With {deal.party}
                                        </p>
                                    </div>
                                </div>
                                <Button asChild>
                                    <Link href={`/dashboard/deals/${deal.id}`}>
                                        {deal.status === 'in_review' ? 'Review Now' : 'View Dispute'}
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground py-8">
                        <Handshake className="mx-auto h-12 w-12" />
                        <p className="mt-4 font-semibold">All clear!</p>
                        <p>You have no deals that require your immediate attention.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
