
'use client';

import { useState } from 'react';
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
import { PlusCircle, ArrowUpRight, ArrowDownLeft, Building, Phone } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { walletTransactions, savedPaymentMethods, PaymentMethod } from '@/lib/data';

export default function WalletPage() {
    const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
    const [isAddFundsDialogOpen, setIsAddFundsDialogOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(savedPaymentMethods[0]?.id || '');
    const { toast } = useToast();

    const handleWithdraw = () => {
        setIsWithdrawDialogOpen(false);
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
                            {savedPaymentMethods.length > 0 ? (
                                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-2">
                                    {savedPaymentMethods.map(method => (
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
                        <Button onClick={handleAddFunds} disabled={savedPaymentMethods.length === 0}>Confirm Deposit</Button>
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
                        <DialogDescription>Select a payment method and add amount to receive your funds</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount-withdraw">Amount (GHS)</Label>
                            <Input id="amount-withdraw" type="number" placeholder="500.00" />
                        </div>
                        <div className="space-y-2">
                             <Label>Select Payment Method</Label>
                             {savedPaymentMethods.length > 0 ? (
                                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-2">
                                    {savedPaymentMethods.map(method => (
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
                        <Button onClick={handleWithdraw} disabled={savedPaymentMethods.length === 0}>Confirm Withdrawal</Button>
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
            {walletTransactions.map((tx) => (
              <Card key={tx.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
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
                  <div className="text-right">
                    <p className={cn("font-mono font-semibold", tx.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                      {tx.amount > 0 ? '+' : '-'}GHS {Math.abs(tx.amount).toLocaleString()}
                    </p>
                     <Badge variant={tx.status === 'Completed' ? 'default' : 'secondary'} className={cn("mt-1", {'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': tx.status === 'Completed', 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': tx.status !== 'Completed'})}>
                        {tx.status}
                      </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
