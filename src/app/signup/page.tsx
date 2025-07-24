// /src/app/signup/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLogo } from '@/components/AppLogo';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Checkbox } from '@/components/ui/checkbox';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.545 6.545a9.03 9.03 0 0 1 0 10.91m-10.91 0a9.03 9.03 0 0 1 0-10.91" />
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { signUp, signInWithGoogle } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast({
        variant: 'destructive',
        title: 'Agreement Required',
        description: 'You must agree to the terms and conditions.',
      });
      return;
    }
    setIsLoading(true);

    try {
      await signUp(email, password, fullName);
      toast({
        title: "Account Created!",
        description: "You're being redirected to the onboarding process."
      });
      router.push('/onboarding');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: error.message || 'Could not create your account. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!agreedToTerms) {
      toast({
        variant: 'destructive',
        title: 'Agreement Required',
        description: 'You must agree to the terms and conditions.',
      });
      return;
    }
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Signed In Successfully!",
        description: "You're being redirected to the onboarding process."
      });
      router.push('/onboarding');
    } catch (error: any) {
       toast({
        variant: 'destructive',
        title: 'Google Sign In Failed',
        description: error.message || 'Could not sign you in with Google. Please try again.',
      });
    } finally {
        setIsGoogleLoading(false);
    }
  }
  
  const isButtonDisabled = isLoading || isGoogleLoading || !agreedToTerms;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <AppLogo />
          </div>
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>Enter your info to start.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="John Doe" required value={fullName} onChange={e => setFullName(e.target.value)} disabled={isLoading || isGoogleLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading || isGoogleLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading || isGoogleLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="referral-code">Referral Code (If you have one)</Label>
              <Input id="referral-code" placeholder="Enter referral code" disabled={isLoading || isGoogleLoading} />
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} disabled={isLoading || isGoogleLoading} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the 
                  <Link href="/terms-of-service" className="font-semibold text-primary underline" target="_blank">
                     Terms of Service
                  </Link> and 
                  <Link href="/privacy-policy" className="font-semibold text-primary underline" target="_blank">
                     Privacy Policy
                  </Link>
                  .
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isButtonDisabled}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-muted" />
            <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Or</span>
            <div className="flex-grow border-t border-muted" />
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isButtonDisabled}>
             {isGoogleLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up...
                </>
             ) : (
                <>
                <GoogleIcon className="mr-2 h-4 w-4" />
                Sign up with Google
                </>
             )}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          Have an account?&nbsp;
          <Link href="/login" className="font-semibold text-primary underline">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
