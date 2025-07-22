// /src/app/dashboard/page.tsx
// /src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CardFooter } from '@/components/ui/card';
import { PlusCircle, Building, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { PaymentMethod, Deal, Transaction, LeaderboardUser, CurrentUser } from '@/lib/data';
import { getSavedPaymentMethods, getCurrentUser, getLeaderboard } from '@/lib/services/user.service';
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
    paymentMethods: PaymentMethod[];
}

export default function DashboardPage() {
    const { toast } = useToast();
    const [isAddFundsDialogOpen, setIsAddFundsDialogOpen] = useState(false);
    const [data, setData] = useState<DashboardData | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    useEffect(() => {
        async function fetchDashboardData() {
            const [currentUser, deals, transactions, leaderboard, paymentMethods] = await Promise.all([
                getCurrentUser(),
                getDeals(),
                getRecentTransactions(),
                getLeaderboard(),
                getSavedPaymentMethods(),
            ]);
            setData({ currentUser, deals, transactions, leaderboard, paymentMethods });
            if (paymentMethods.length > 0) {
                setSelectedPaymentMethod(paymentMethods[0].id);
            }
        }
        fetchDashboardData();
    }, []);

    const handleAddFunds = () => {
      setIsAddFundsDialogOpen(false);
      toast({
          title: 'Deposit Initialized',
          description: 'Your request has been received. You will be prompted to confirm the transaction.',
      });
    }
    
    if (!data) {
        return <div>Loading dashboard...</div>; // Replace with a proper skeleton loader later
    }

    const { currentUser, deals, transactions, leaderboard, paymentMethods } = data;
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
            <Dialog open={isAddFundsDialogOpen} onOpenChange={setIsAddFundsDialogOpen}>
              <DialogTrigger asChild>
                  <Button variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Funds
                  </Button>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Add Funds</DialogTitle>
                      <DialogDescription>
                          Select a payment method and enter the amount to add to your wallet. You will be prompted to confirm on your device.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                      <div className="space-y-2">
                          <Label htmlFor="amount">Amount (GHS)</Label>
                          <Input id="amount" type="number" placeholder="500.00" />
                      </div>
                      <div className="space-y-2">
                          <Label>Select Payment Method</Label>
                          {paymentMethods.length > 0 ? (
                              <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-2">
                                  {paymentMethods.map(method => (
                                      <Label key={method.id} htmlFor={method.id} className={cn('flex items-center gap-4 rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', selectedPaymentMethod === method.id && 'border-primary')}>
                                          <RadioGroupItem value={method.id} id={method.id}/>
                                          {method.type === 'bank' ? <Building className="h-6 w-6 text-muted-foreground" /> : <Phone className="h-6 w-6 text-muted-foreground" />}
                                          <div className="flex-1">
                                              <p className="font-semibold">
                                                  {method.type === 'bank' ? method.details.bankName : `Mobile Money (${method.details.provider?.toUpperCase()})`}
                                              </p>
                                              <p className="text-sm text-muted-foreground">
                                                  {method.type === 'bank' ? method.details.accountNumber : method.details.phoneNumber}
                                              </p>
                                          </div>
                                      </Label>
                                  ))}
                              </RadioGroup>
                          ) : (
                              <div className="text-center text-muted-foreground py-4 border rounded-md">
                                  <p>No payment methods found.</p>
                                  <Button variant="link" asChild>
                                      <Link href="/dashboard/profile?tab=payments" onClick={() => setIsAddFundsDialogOpen(false)}>Add a Method</Link>
                                  </Button>
                              </div>
                          )}
                      </div>
                  </div>
                  <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddFundsDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddFunds} disabled={paymentMethods.length === 0}>Confirm Deposit</Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCards />
        <ReferralRanks leaderboard={leaderboard} currentUser={currentUser} />
      </div>
      
      <AttentionDeals deals={dealsNeedingAttention} />

      <RecentTransactions transactions={transactions} />
    </div>
  );
}
