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
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, ArrowUpRight, ArrowDownLeft, Building, Phone, ChevronDown, Zap, Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import type { WalletTransaction, PaymentMethod } from '@/lib/data';
import { getWalletTransactions } from '@/lib/services/wallet.service';
import { getSavedPaymentMethods } from '@/lib/services/user.service';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function WalletPage() {
    const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
    const [isAddFundsDialogOpen, setIsAddFundsDialogOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [withdrawalType, setWithdrawalType] = useState('standard');
    const [password, setPassword] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        async function fetchData() {
            const [transactionsData, paymentMethodsData] = await Promise.all([
                getWalletTransactions(),
                getSavedPaymentMethods()
            ]);
            setTransactions(transactionsData);
            setPaymentMethods(paymentMethodsData);
            if (paymentMethodsData.length > 0) {
                setSelectedPaymentMethod(paymentMethodsData[0].id);
            }
        }
        fetchData();
    }, []);

    const handleWithdraw = () => {
        setIsWithdrawDialogOpen(false);
        setPassword('');
        toast({
            title: 'Withdrawal Initiated',
            description: 'Your request has been received and is being processed.',
        });
    }

    const handleAddFunds = () => {
      setIsAddFundsDialogOpen(false);
      toast({
          title: 'Deposit Initialized',
          description: 'Your request has been received. You will be prompted to confirm the transaction.',
      });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold font-headline">Wallet</h1>
        <div className="flex flex-col sm:flex-row gap-2">
            <Dialog open={isAddFundsDialogOpen} onOpenChange={setIsAddFundsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
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
                            <Label htmlFor="amount-add">Amount (GHS)</Label>
                            <Input id="amount-add" type="number" placeholder="500.00" />
                        </div>
                        <div className="space-y-2">
                            <Label>Select Payment Method</Label>
                            {paymentMethods.length > 0 ? (
                                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-2">
                                    {paymentMethods.map(method => (
                                        <Label key={method.id} htmlFor={`add-${method.id}`} className={cn('flex items-center gap-4 rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', selectedPaymentMethod === method.id && 'border-primary')}>
                                            <RadioGroupItem value={method.id} id={`add-${method.id}`}/>
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
            <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Withdraw Funds
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                        <DialogDescription>
                          Select a payout method, speed, and amount to receive your funds.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount-withdraw">Amount (GHS)</Label>
                            <Input id="amount-withdraw" type="number" placeholder="500.00" />
                        </div>
                         <div className="space-y-2">
                            <Label>Speed</Label>
                             <RadioGroup value={withdrawalType} onValueChange={setWithdrawalType} className="grid grid-cols-2 gap-4">
                                <Label htmlFor="standard-withdrawal" className={cn('flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', withdrawalType === 'standard' && 'border-primary')}>
                                    <RadioGroupItem value="standard" id="standard-withdrawal" className="sr-only" />
                                    <Clock className="h-6 w-6 mb-2" />
                                    <span className="font-semibold">Standard</span>
                                    <span className="text-xs text-muted-foreground">1-2 days (Free)</span>
                                </Label>
                                <Label htmlFor="instant-withdrawal" className={cn('flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', withdrawalType === 'instant' && 'border-primary')}>
                                    <RadioGroupItem value="instant" id="instant-withdrawal" className="sr-only" />
                                    <Zap className="h-6 w-6 mb-2" />
                                    <span className="font-semibold">Instant</span>
                                    <span className="text-xs text-muted-foreground">~5 mins (GHS 2.00)</span>
                                </Label>
                             </RadioGroup>
                        </div>
                        <div className="space-y-2">
                             <Label>Select Payout Method</Label>
                             {paymentMethods.length > 0 ? (
                                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-2">
                                    {paymentMethods.map(method => (
                                        <Label key={method.id} htmlFor={`withdraw-${method.id}`} className={cn('flex items-center gap-4 rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', selectedPaymentMethod === method.id && 'border-primary')}>
                                            <RadioGroupItem value={method.id} id={`withdraw-${method.id}`}/>
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
                                        <Link href="/dashboard/profile?tab=payments" onClick={() => setIsWithdrawDialogOpen(false)}>Add a Method</Link>
                                    </Button>
                                </div>
                             )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>Cancel</Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button disabled={paymentMethods.length === 0}>Confirm Withdrawal</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        For your security, please enter your password to confirm this withdrawal.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="space-y-2 py-2">
                                    <Label htmlFor="password-confirm-withdraw">Password</Label>
                                    <Input id="password-confirm-withdraw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setPassword('')}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleWithdraw} disabled={!password}>
                                        Confirm
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Money</CardTitle>
            <CardDescription>Money you can use now.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">GHS 12,345.67</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Money on Hold</CardTitle>
            <CardDescription>Money in active deals.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">GHS 5,000.00</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wallet History</CardTitle>
          <CardDescription>A record of your money movements.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
            {transactions.map((tx) => (
              <Collapsible key={tx.id} asChild>
                <Card>
                  <CollapsibleTrigger asChild>
                    <button className="flex w-full items-center justify-between p-4 group">
                      <div className="flex items-center gap-4 text-left">
                        {tx.amount > 0 ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                            <ArrowDownLeft className="h-5 w-5 text-green-500" />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                            <ArrowUpRight className="h-5 w-5 text-red-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{tx.type}</p>
                          <p className="text-sm text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={cn("font-mono font-semibold", tx.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                            {tx.amount > 0 ? '+' : '-'}GHS {Math.abs(tx.amount).toLocaleString()}
                          </p>
                          <Badge variant={tx.status === 'Completed' ? 'default' : 'secondary'} className={cn("mt-1", {'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': tx.status === 'Completed', 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': tx.status !== 'Completed'})}>
                              {tx.status}
                          </Badge>
                        </div>
                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 space-y-2">
                        <Separator/>
                        <p className="text-sm text-muted-foreground pt-2">{tx.description}</p>
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
