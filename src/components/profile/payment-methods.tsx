// /src/components/profile/payment-methods.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlusCircle, Building, Phone, Trash2, CreditCard, KeyRound, Fingerprint, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { PaymentMethod, MobileMoneyProvider, PaymentMethodType } from '@/lib/data';
import { getSavedPaymentMethods } from '@/lib/services/user.service';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

type AuthMethod = 'password' | 'biometric' | 'otp';

export function PaymentMethods() {
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [newPaymentType, setNewPaymentType] = useState<PaymentMethodType>('mobile_money');
  const [momoProvider, setMomoProvider] = useState<MobileMoneyProvider>('mtn');
  const [momoNumber, setMomoNumber] = useState('');
  const [momoName, setMomoName] = useState('');
  const [isFetchingName, setIsFetchingName] = useState(false);
  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [isFetchingBankName, setIsFetchingBankName] = useState(false);
  const [authMethod, setAuthMethod] = useState<AuthMethod>('password');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    async function fetchPaymentMethods() {
        const methods = await getSavedPaymentMethods();
        setPaymentMethods(methods);
    }
    fetchPaymentMethods();
  }, []);

  const resetForm = () => {
    setNewPaymentType('mobile_money');
    setMomoProvider('mtn');
    setMomoNumber('');
    setMomoName('');
    setBankName('');
    setBankAccountNumber('');
    setBankAccountName('');
  }
  
  const handleSendOtp = () => {
    setIsOtpSent(true);
    toast({
      title: "OTP Sent",
      description: "A one-time code has been sent to your email.",
    });
  };

  const handleAddPaymentMethod = () => {
      let newMethod: PaymentMethod | null = null;
      if (newPaymentType === 'mobile_money' && momoNumber && momoName) {
        newMethod = {
          id: `pm_${Date.now()}`,
          type: 'mobile_money',
          details: {
            provider: momoProvider,
            phoneNumber: momoNumber,
            phoneName: momoName,
          }
        };
      } else if (newPaymentType === 'bank' && bankName && bankAccountNumber && bankAccountName) {
        newMethod = {
          id: `pm_${Date.now()}`,
          type: 'bank',
          details: {
            bankName: bankName,
            accountNumber: bankAccountNumber,
            accountName: bankAccountName,
          }
        };
      }
      
      if (newMethod) {
          setPaymentMethods(prev => [...prev, newMethod!]);
          setIsAddPaymentDialogOpen(false);
          toast({
              title: 'Payment Method Added',
              description: 'Your new payment method has been saved successfully.'
          });
          resetForm();
      } else {
          toast({
              variant: 'destructive',
              title: 'Incomplete Details',
              description: 'Please fill out all fields for the selected payment method.'
          });
      }
  }

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    setPassword('');
    setOtp('');
    setIsOtpSent(false);
    toast({
        title: 'Payment Method Removed',
        variant: 'destructive',
    });
  }
  
  const handleFetchName = () => {
    if (momoNumber.length >= 9) { // Simple validation for phone number length
      setIsFetchingName(true);
      setMomoName('');
      setTimeout(() => {
        setMomoName('User Name'); // Simulate fetched name
        setIsFetchingName(false);
      }, 1500); // Simulate network delay
    }
  };

  const handleFetchBankName = () => {
    if (bankAccountNumber.length > 5) { // Simple validation
      setIsFetchingBankName(true);
      setBankAccountName('');
      setTimeout(() => {
        setBankAccountName('User Name'); // Simulate fetched name
        setIsFetchingBankName(false);
      }, 1500); // Simulate network delay
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Add and manage your payment methods for withdrawals.</CardDescription>
        </div>
        <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2" /> Add Method</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Payment Method</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <RadioGroup value={newPaymentType} onValueChange={(val: any) => setNewPaymentType(val)} className="grid grid-cols-2 gap-4">
                <Label htmlFor="mobile_money" className={cn('flex items-center gap-2 rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', newPaymentType === 'mobile_money' && 'border-primary')}>
                  <RadioGroupItem value="mobile_money" id="mobile_money" />
                  <Phone className="h-5 w-5" />
                  Mobile Money
                </Label>
                <Label htmlFor="bank" className={cn('flex items-center gap-2 rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', newPaymentType === 'bank' && 'border-primary')}>
                  <RadioGroupItem value="bank" id="bank" />
                  <Building className="h-5 w-5" />
                  Bank Account
                </Label>
              </RadioGroup>
              {newPaymentType === 'mobile_money' && (
                <div className="space-y-4 p-4 border rounded-md">
                  <RadioGroup value={momoProvider} onValueChange={(val: any) => setMomoProvider(val)} className="grid grid-cols-3 gap-2">
                    <Label htmlFor="mtn" className="flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary">
                      <RadioGroupItem value="mtn" id="mtn" className="sr-only" />
                      <div className="h-6 w-10 rounded-sm bg-yellow-400 flex items-center justify-center text-white font-bold text-xs">MTN</div>
                    </Label>
                    <Label htmlFor="telecel" className="flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary">
                      <RadioGroupItem value="telecel" id="telecel" className="sr-only" />
                      <div className="h-6 w-10 rounded-sm bg-red-600 flex items-center justify-center text-white font-bold text-xs">Telecel</div>
                    </Label>
                    <Label htmlFor="airteltigo" className="flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary">
                      <RadioGroupItem value="airteltigo" id="airteltigo" className="sr-only" />
                      <div className="h-6 w-10 rounded-sm bg-blue-800 flex items-center justify-center text-white font-bold text-xs">AirtelTigo</div>
                    </Label>
                  </RadioGroup>
                  <div className="space-y-2">
                    <Label htmlFor="momo-number">Phone Number</Label>
                    <Input
                      id="momo-number"
                      placeholder="024 123 4567"
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      onBlur={handleFetchName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="momo-name">Registered Name</Label>
                    <Input
                      id="momo-name"
                      value={isFetchingName ? 'Verifying...' : momoName}
                      readOnly
                      placeholder="Name will appear here"
                    />
                  </div>
                </div>
              )}
              {newPaymentType === 'bank' && (
                <div className="space-y-4 p-4 border rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank</Label>
                    <Input id="bank-name" placeholder="Fidelity Bank" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input
                      id="account-number"
                      placeholder="1234567890123"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      onBlur={handleFetchBankName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account-name">Account Name</Label>
                    <Input
                      id="account-name"
                      value={isFetchingBankName ? 'Verifying...' : bankAccountName}
                      readOnly
                      placeholder="Name will appear here"
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPaymentDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddPaymentMethod}>Save Method</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentMethods.map(method => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {method.type === 'bank' ? <Building className="h-8 w-8 text-muted-foreground flex-shrink-0" /> : <Phone className="h-8 w-8 text-muted-foreground flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {method.type === 'bank' ? method.details.bankName : `Mobile Money (${method.details.provider?.toUpperCase()})`}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {method.type === 'bank' ? method.details.accountNumber : method.details.phoneNumber}
                  </p>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove this payment method. For your security, please confirm your identity to continue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4 space-y-4">
                        <RadioGroup value={authMethod} onValueChange={(val: any) => setAuthMethod(val)} className="grid grid-cols-3 gap-2">
                            <Label htmlFor={`del-pm-password-auth-${method.id}`} className={cn('flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary')}>
                                <RadioGroupItem value="password" id={`del-pm-password-auth-${method.id}`} className="sr-only"/>
                                <KeyRound className="h-4 w-4"/>
                            </Label>
                            <Label htmlFor={`del-pm-biometric-auth-${method.id}`} className={cn('flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary')}>
                                <RadioGroupItem value="biometric" id={`del-pm-biometric-auth-${method.id}`} className="sr-only"/>
                                <Fingerprint className="h-4 w-4"/>
                            </Label>
                            <Label htmlFor={`del-pm-otp-auth-${method.id}`} className={cn('flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary')}>
                                <RadioGroupItem value="otp" id={`del-pm-otp-auth-${method.id}`} className="sr-only"/>
                                <Mail className="h-4 w-4"/>
                            </Label>
                        </RadioGroup>
                        {authMethod === 'password' && (
                            <div className="space-y-2">
                            <Label htmlFor="password-confirm-delete-pm">Password</Label>
                            <Input id="password-confirm-delete-pm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                            </div>
                        )}
                        {authMethod === 'biometric' && (
                            <Button variant="outline" className="w-full justify-center gap-2"><Fingerprint />Confirm with Biometrics</Button>
                        )}
                        {authMethod === 'otp' && (
                            <div className="space-y-2">
                            <Label htmlFor="otp-confirm-delete-pm">Email OTP</Label>
                            <div className="flex gap-2">
                                <Input id="otp-confirm-delete-pm" type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit code" />
                                <Button type="button" variant="secondary" onClick={handleSendOtp} disabled={isOtpSent}>{isOtpSent ? 'Resend' : 'Send Code'}</Button>
                            </div>
                            </div>
                        )}
                      </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {setPassword(''); setOtp(''); setIsOtpSent(false)}}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteMethod(method.id)} disabled={authMethod === 'password' && !password}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
          {paymentMethods.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <CreditCard className="mx-auto h-12 w-12" />
              <p className="mt-4">You haven't added any payment methods yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
