// /src/app/dashboard/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from "next-themes"
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Copy, Check, Share2, Sun, Moon, Monitor, AlertTriangle, Building, Briefcase, PlusCircle, CreditCard, Phone, Trash2, AtSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { avatars, industries, PaymentMethod, MobileMoneyProvider, PaymentMethodType } from '@/lib/data';


const initialPaymentMethods: PaymentMethod[] = [
    { id: 'pm_1', type: 'mobile_money', details: { provider: 'mtn', phoneNumber: '024 123 4567', phoneName: 'User Name' } },
    { id: 'pm_2', type: 'bank', details: { bankName: 'Fidelity Bank', accountNumber: '**** **** **** 1234', accountName: 'User Name' } },
];

export default function ProfilePage() {
  const [name, setName] = useState('User');
  const [betweenaId, setBetweenaId] = useState('user');
  const [isIdCustomized, setIsIdCustomized] = useState(false);
  const [businessName, setBusinessName] = useState('Acme Inc.');
  const [businessRole, setBusinessRole] = useState('Founder');
  const [selectedIndustry, setSelectedIndustry] = useState('Technology & IT Services');
  const [customIndustry, setCustomIndustry] = useState('');
  const [mainProducts, setMainProducts] = useState('Web Development, UI/UX Design, SEO Services');
  const [referralCode, setReferralCode] = useState('BETA-USER-123');
  const [isReferralCustomized, setIsReferralCustomized] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(avatars[0]);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [newPaymentType, setNewPaymentType] = useState<PaymentMethodType>('mobile_money');
  const [momoProvider, setMomoProvider] = useState<MobileMoneyProvider>('mtn');
  const [momoNumber, setMomoNumber] = useState('');
  const [momoName, setMomoName] = useState('');
  const [isFetchingName, setIsFetchingName] = useState(false);
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');
  const [isFetchingBankName, setIsFetchingBankName] = useState(false);


  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleIdCustomize = () => {
    setIsIdCustomized(true);
    toast({
        title: 'Betweena ID Updated!',
        description: 'Your new ID is now active.'
    });
  }

  const handleCustomizeReferral = () => {
    setIsReferralCustomized(true);
    toast({
      title: 'Referral Code Updated!',
      description: 'Your new code is now active.',
    });
  };
  
  const handleAvatarSave = () => {
    setCurrentAvatar(selectedAvatar);
    setIsAvatarDialogOpen(false);
    toast({
        title: 'Avatar Updated!',
        description: 'Your new profile picture has been saved.',
    });
  };

  const handleAddPaymentMethod = () => {
      // Logic to save payment method would go here
      setIsAddPaymentDialogOpen(false);
      toast({
          title: 'Payment Method Added',
          description: 'Your new payment method has been saved successfully.'
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


  const referralLink = `https://betweena.app/signup?ref=${referralCode}`;

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
          text: `Use my referral code to sign up: ${referralCode}`,
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


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">My Profile</h1>
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="referral">Referrals</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={currentAvatar.src} data-ai-hint={currentAvatar.hint} />
                  <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                 <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Change Photo</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Choose Your Avatar</DialogTitle>
                        <DialogDescription>Select a new profile picture from the options below.</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-3 gap-4 py-4">
                        {avatars.map((avatar, index) => (
                            <button
                            key={index}
                            className={cn(
                                "rounded-full ring-2 ring-transparent hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                selectedAvatar.src === avatar.src && "ring-primary"
                            )}
                            onClick={() => setSelectedAvatar(avatar)}
                            >
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={avatar.src} data-ai-hint={avatar.hint} alt={avatar.alt} />
                                <AvatarFallback>{avatar.alt.charAt(avatar.alt.length-1)}</AvatarFallback>
                            </Avatar>
                            </button>
                        ))}
                        </div>
                        <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAvatarDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleAvatarSave}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="betweena-id">Betweena ID</Label>
                <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                    <Input 
                        id="betweena-id"
                        className="pl-9"
                        value={betweenaId} 
                        onChange={(e) => setBetweenaId(e.target.value)} 
                        readOnly={isIdCustomized} 
                    />
                </div>
                 {!isIdCustomized && <p className="text-xs text-muted-foreground">You can set your unique Betweena ID once.</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="user@example.com" disabled />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Save Changes</Button>
              {!isIdCustomized && (
                  <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <Button variant="outline">Set and Lock ID</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                You can only customize your Betweena ID once. This action cannot be undone.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleIdCustomize}>Confirm and Set ID</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
              )}
            </CardFooter>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-role">Your Role</Label>
                <Input id="business-role" value={businessRole} onChange={(e) => setBusinessRole(e.target.value)} placeholder="e.g. Founder, CEO" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-email">Business Email</Label>
                <Input id="business-email" type="email" defaultValue="contact@acme.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                 <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                        {industries.map(industry => (
                            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
              {selectedIndustry === 'Other' && (
                <div className="space-y-2">
                    <Label htmlFor="custom-industry">Your Industry</Label>
                    <Input 
                        id="custom-industry" 
                        value={customIndustry} 
                        onChange={(e) => setCustomIndustry(e.target.value)} 
                        placeholder="e.g., Renewable Energy"
                    />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="main-products">Main Products/Services</Label>
                <Textarea id="main-products" value={mainProducts} onChange={(e) => setMainProducts(e.target.value)} placeholder="e.g. Web Development, UI/UX Design, SEO Services" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Business Info</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payments">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Add and manage your payment methods for withdrawals.</CardDescription>
                    </div>
                    <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
                        <DialogTrigger asChild>
                           <Button><PlusCircle className="mr-2"/> Add Method</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Payment Method</DialogTitle>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                               <RadioGroup value={newPaymentType} onValueChange={(val: any) => setNewPaymentType(val)} className="grid grid-cols-2 gap-4">
                                   <Label htmlFor="mobile_money" className={cn('flex items-center gap-2 rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', newPaymentType === 'mobile_money' && 'border-primary')}>
                                       <RadioGroupItem value="mobile_money" id="mobile_money" />
                                       <Phone className="h-5 w-5"/>
                                       Mobile Money
                                   </Label>
                                    <Label htmlFor="bank" className={cn('flex items-center gap-2 rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', newPaymentType === 'bank' && 'border-primary')}>
                                       <RadioGroupItem value="bank" id="bank" />
                                       <Building className="h-5 w-5"/>
                                       Bank Account
                                   </Label>
                               </RadioGroup>
                               {newPaymentType === 'mobile_money' && (
                                   <div className="space-y-4 p-4 border rounded-md">
                                        <RadioGroup value={momoProvider} onValueChange={(val: any) => setMomoProvider(val)} className="grid grid-cols-3 gap-2">
                                            <Label htmlFor="mtn" className="flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary">
                                                <RadioGroupItem value="mtn" id="mtn" className="sr-only"/>
                                                <div className="h-6 w-10 rounded-sm bg-yellow-400 flex items-center justify-center text-white font-bold text-xs">MTN</div>
                                            </Label>
                                            <Label htmlFor="telecel" className="flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary">
                                                <RadioGroupItem value="telecel" id="telecel" className="sr-only"/>
                                                <div className="h-6 w-10 rounded-sm bg-red-600 flex items-center justify-center text-white font-bold text-xs">Telecel</div>
                                            </Label>
                                             <Label htmlFor="airteltigo" className="flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary">
                                                <RadioGroupItem value="airteltigo" id="airteltigo" className="sr-only"/>
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
                                                disabled 
                                            />
                                        </div>
                                   </div>
                               )}
                               {newPaymentType === 'bank' && (
                                   <div className="space-y-4 p-4 border rounded-md">
                                       <div className="space-y-2">
                                            <Label htmlFor="bank-name">Bank</Label>
                                            <Input id="bank-name" placeholder="Fidelity Bank" />
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
                                                disabled 
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
                                <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
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
        </TabsContent>
        <TabsContent value="referral">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Code</CardTitle>
              <CardDescription>
                {isReferralCustomized
                  ? 'Share your code to earn rewards.'
                  : 'You can change your code once. Make sure it is the right one.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {!isReferralCustomized && (
                <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-semibold">Warning: This action cannot be undone.</p>
                        <p>Changing your code means you will no longer be credited for deals associated with your old code.</p>
                    </div>
                </div>
               )}
              <div className="space-y-2">
                <Label htmlFor="referral-code">Your Code</Label>
                <Input
                  id="referral-code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  readOnly={isReferralCustomized}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referral-link">Your Referral Link</Label>
                <div className="flex gap-2">
                  <Input id="referral-link" value={referralLink} readOnly />
                  <Button type="button" variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy referral link">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                   <Button type="button" variant="outline" size="icon" onClick={handleShare} aria-label="Share referral link">
                      <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            {!isReferralCustomized && (
              <CardFooter>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>Set and Lock Code</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You can only customize your referral code once. Changing it means you will no longer be credited for deals associated with your old code. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCustomizeReferral}>Confirm and Set Code</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Choose how Betweena looks on your device.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={theme} onValueChange={setTheme} className="grid sm:grid-cols-3 gap-4">
                    <Label htmlFor="light" className={cn('flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', theme === 'light' && 'border-primary')}>
                        <RadioGroupItem value="light" id="light" className="sr-only"/>
                        <Sun className="h-6 w-6 mb-2"/>
                        <span>Light</span>
                    </Label>
                    <Label htmlFor="dark" className={cn('flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', theme === 'dark' && 'border-primary')}>
                        <RadioGroupItem value="dark" id="dark" className="sr-only"/>
                        <Moon className="h-6 w-6 mb-2"/>
                        <span>Dark</span>
                    </Label>
                     <Label htmlFor="system" className={cn('flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', theme === 'system' && 'border-primary')}>
                        <RadioGroupItem value="system" id="system" className="sr-only"/>
                        <Monitor className="h-6 w-6 mb-2"/>
                        <span>System</span>
                    </Label>
                </RadioGroup>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                  <Input id="confirm-new-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Change Password</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>Manage your personal data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <Button variant="outline">Export My Data</Button>
              </CardContent>
              <CardFooter className="border-t border-destructive/20 bg-destructive/5 pt-4">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-destructive">Delete Account</p>
                    <p className="text-xs text-destructive/80">Permanently delete your account and all associated data. This action cannot be undone.</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
