// /src/app/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AppLogo } from '@/components/AppLogo';
import { CheckCircle, Building, Phone } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { industries, PaymentMethodType, MobileMoneyProvider } from '@/lib/data';


const totalSteps = 5;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [newPaymentType, setNewPaymentType] = useState<PaymentMethodType>('mobile_money');
  const [momoProvider, setMomoProvider] = useState<MobileMoneyProvider>('mtn');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [customIndustry, setCustomIndustry] = useState('');
  const router = useRouter();

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const progress = (step / totalSteps) * 100;

  const handleFinish = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="absolute top-6">
        <AppLogo />
      </div>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-center font-headline">
            {step === 1 && 'Welcome to Betweena!'}
            {step === 2 && 'About You'}
            {step === 3 && 'Your Business'}
            {step === 4 && 'Payment Setup'}
            {step === 5 && 'All Set!'}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1 && 'Let\'s set up your account.'}
            {step === 2 && 'This helps us know who you are.'}
            {step === 3 && 'Tell us about your business.'}
            {step === 4 && 'Add a payment method for withdrawals.'}
            {step === 5 && 'You are ready to start.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[250px]">
          {step === 1 && (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-muted-foreground">Ready to start with safe payments?</p>
            </div>
          )}
          {step === 2 && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" defaultValue="User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
            </form>
          )}
          {step === 3 && (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" placeholder="Acme Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input id="role" placeholder="Founder, CEO, etc." />
              </div>
               <div className="space-y-2">
                <Label htmlFor="business-email">Business Email</Label>
                <Input id="business-email" type="email" placeholder="contact@acme.com" />
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
                <Label htmlFor="products">Main Products/Services</Label>
                <Textarea id="products" placeholder="e.g. Web Development, UI/UX Design, SEO Services" />
              </div>
            </form>
          )}
          {step === 4 && (
            <div className="space-y-4">
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
                              <Input id="momo-number" placeholder="024 123 4567" />
                          </div>
                           <div className="space-y-2">
                              <Label htmlFor="momo-number-confirm">Confirm Phone Number</Label>
                              <Input id="momo-number-confirm" placeholder="024 123 4567" />
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
                              <Input id="account-number" placeholder="1234567890123" />
                          </div>
                           <div className="space-y-2">
                              <Label htmlFor="account-number-confirm">Confirm Account Number</Label>
                              <Input id="account-number-confirm" placeholder="1234567890123" />
                          </div>
                     </div>
                 )}
              </div>
          )}
          {step === 5 && (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-lg font-medium">Your profile is ready!</p>
              <p className="text-muted-foreground">
                You can now go to your dashboard.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div>
            {step > 1 && step < totalSteps && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
             {(step === 2 || step === 3 || step === 4) && (
                <Button variant="outline" onClick={nextStep}>
                    Skip for now
                </Button>
             )}
            {step < totalSteps && (
              <Button onClick={nextStep}>
                {step === totalSteps - 1 ? 'Finish' : 'Next'}
              </Button>
            )}
            {step === totalSteps && (
              <Button className="w-full" onClick={handleFinish}>
                Go to Dashboard
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
