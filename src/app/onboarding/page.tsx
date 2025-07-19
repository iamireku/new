'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AppLogo } from '@/components/AppLogo';
import { CheckCircle } from 'lucide-react';

const totalSteps = 4;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
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
            {step === 2 && 'Tell us about yourself'}
            {step === 3 && 'Your Business Information'}
            {step === 4 && 'All Set!'}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1 && 'Let\'s get your account set up in a few easy steps.'}
            {step === 2 && 'This information helps us verify your identity.'}
            {step === 3 && 'Tell us about the business you represent.'}
            {step === 4 && 'You are ready to start transacting securely.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[250px]">
          {step === 1 && (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-muted-foreground">Ready to start with secure transactions?</p>
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
            </form>
          )}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-lg font-medium">Your profile is complete!</p>
              <p className="text-muted-foreground">
                You can now access your dashboard and start using Betweena.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && step < 4 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step === 1 && <div />}
          {step < 4 && (
            <Button onClick={nextStep}>
              Next
            </Button>
          )}
          {step === 4 && (
            <Button className="w-full" onClick={handleFinish}>
              Go to Dashboard
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
