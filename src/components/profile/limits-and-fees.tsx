// /src/components/profile/limits-and-fees.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, BadgePercent } from 'lucide-react';

export function LimitsAndFees() {
    const dailyLimit = 5000;
    const usedAmount = 1250;
    const dailyProgress = (usedAmount / dailyLimit) * 100;

    const transactionFee = {
        percentage: 1.5,
        cap: 50.00,
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Transaction Limits</CardTitle>
                    <CardDescription>These are your current limits for sending and receiving money.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Daily Limit</span>
                            <span className="text-sm text-muted-foreground">
                                GHS {usedAmount.toLocaleString()} / GHS {dailyLimit.toLocaleString()}
                            </span>
                        </div>
                        <Progress value={dailyProgress} />
                        <p className="text-xs text-muted-foreground mt-1">Your limits reset every 24 hours.</p>
                    </div>
                     <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Single Transaction Limit</span>
                            <span className="text-sm text-muted-foreground">
                                GHS 20,000.00
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                     <div className="flex items-center gap-2">
                        <BadgePercent className="h-5 w-5" />
                        <CardTitle>Service Fees</CardTitle>
                    </div>
                    <CardDescription>We charge a small fee for each successfully completed deal to keep the platform running.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex items-baseline justify-between rounded-lg border p-4">
                        <p className="text-sm">For every successful transaction:</p>
                        <p className="text-xl font-bold">{transactionFee.percentage}%</p>
                   </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        <span>The fee is capped at a maximum of GHS {transactionFee.cap.toFixed(2)}.</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
