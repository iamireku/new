'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wallet, Landmark, Users, ArrowUpRight, ArrowDownLeft, Copy, Share2, Check, PlusCircle, Building, Phone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { recentTransactions, leaderboard, currentUser, savedPaymentMethods, PaymentMethod } from '@/lib/data';

const TRANSACTIONS_PER_PAGE = 5;

export default function DashboardPage() {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);
    const [isAddFundsDialogOpen, setIsAddFundsDialogOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(savedPaymentMethods[0]?.id || '');
    const [visibleTransactionsCount, setVisibleTransactionsCount] = useState(TRANSACTIONS_PER_PAGE);

    const referralLink = `https://betweena.app/signup?ref=${currentUser.referralCode}`;

    const handleAddFunds = () => {
      setIsAddFundsDialogOpen(false);
      toast({
          title: 'Deposit Initialized',
          description: 'Your request has been received. You will be prompted to confirm the transaction.',
      });
  }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
            title: 'Copied to clipboard!',
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
            await navigator.share({
                title: 'Join me on Betweena!',
                text: `Use my referral code to sign up: ${currentUser.referralCode}`,
                url: referralLink,
            });
            } catch (error) {
            console.error('Sharing failed:', error);
            }
        } else {
            copyToClipboard();
            toast({
                title: 'Share not supported',
                description: 'Link copied to clipboard instead.',
            });
        }
    };

    const currentUserIndex = leaderboard.findIndex(u => u.name === currentUser.name);
    let displayUsers = [];
    if (currentUserIndex !== -1) {
        const startIndex = Math.max(0, currentUserIndex - 1);
        const endIndex = Math.min(leaderboard.length, currentUserIndex + 2);
        displayUsers = leaderboard.slice(startIndex, endIndex);
    } else {
        displayUsers = leaderboard.slice(0, 3);
    }

    const getStatusText = (status: string) => {
        if (status === 'in_escrow') return 'On Hold';
        return status.replace('_', ' ');
    }

    const transactionsToShow = recentTransactions.slice(0, visibleTransactionsCount);


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
                          {savedPaymentMethods.length > 0 ? (
                              <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-2">
                                  {savedPaymentMethods.map(method => (
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
                      <Button onClick={handleAddFunds} disabled={savedPaymentMethods.length === 0}>Confirm Deposit</Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 12,345.67</div>
            <p className="text-xs text-muted-foreground">Up 20.1% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money on Hold</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GHS 5,000.00</div>
            <p className="text-xs text-muted-foreground">In 3 active deals</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Ranks</CardTitle>
             <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {displayUsers.map((user) => (
                    <div key={user.rank} className={cn("flex items-center gap-4 p-2 rounded-lg", {"bg-primary/10": user.name === currentUser.name})}>
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.hint} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.referrals} referrals</p>
                        </div>
                        {user.name === currentUser.name ? (
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard} aria-label="Copy referral link">
                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare} aria-label="Share referral link">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="font-medium text-right w-[72px]">{`#${user.rank}`}</div>
                        )}
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
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
                        <p className="text-sm text-muted-foreground capitalize">{tx.type}</p>
                    </div>
                    <div className="text-right">
                        <p className={cn("font-mono font-semibold", tx.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                            {tx.amount > 0 ? '+' : ''}GHS {Math.abs(tx.amount).toFixed(2)}
                        </p>
                        <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'} className={cn("mt-1", {
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': tx.status === 'completed',
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': tx.status === 'pending',
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': tx.status === 'in_escrow'
                        })}>
                            {getStatusText(tx.status)}
                        </Badge>
                    </div>
                </div>
            ))}
        </CardContent>
        {recentTransactions.length > visibleTransactionsCount && (
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
    </div>
  );
}
