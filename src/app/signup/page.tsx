
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
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signUp(email, password);
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
              <Input id="full-name" placeholder="John Doe" required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="referral-code">Referral Code (If you have one)</Label>
              <Input id="referral-code" placeholder="Enter referral code" disabled={isLoading} />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-muted" />
            <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">Or</span>
            <div className="flex-grow border-t border-muted" />
          </div>
          <Button variant="outline" className="w-full" disabled={isLoading}>
            <GoogleIcon className="mr-2 h-4 w-4" />
            Sign up with Google
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
