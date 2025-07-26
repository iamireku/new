// /src/components/profile/app-settings.tsx
// /src/components/profile/app-settings.tsx
'use client';

import { useTheme } from 'next-themes';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Sun, Moon, Monitor, KeyRound, Fingerprint, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type AuthMethod = 'password' | 'biometric' | 'otp';

export function AppSettings() {
  const { theme, setTheme } = useTheme();
  const [password, setPassword] = useState('');
  const [authMethod, setAuthMethod] = useState<AuthMethod>('password');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { toast } = useToast();

  const handleSendOtp = () => {
    setIsOtpSent(true);
    toast({
      title: "OTP Sent",
      description: "A one-time code has been sent to your email.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose how Betweena looks on your device.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={theme} onValueChange={setTheme} className="grid sm:grid-cols-3 gap-4">
            <Label htmlFor="light" className={cn('flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', theme === 'light' && 'border-primary')}>
              <RadioGroupItem value="light" id="light" className="sr-only" />
              <Sun className="h-6 w-6 mb-2" />
              <span>Light</span>
            </Label>
            <Label htmlFor="dark" className={cn('flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', theme === 'dark' && 'border-primary')}>
              <RadioGroupItem value="dark" id="dark" className="sr-only" />
              <Moon className="h-6 w-6 mb-2" />
              <span>Dark</span>
            </Label>
            <Label htmlFor="system" className={cn('flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground', theme === 'system' && 'border-primary')}>
              <RadioGroupItem value="system" id="system" className="sr-only" />
              <Monitor className="h-6 w-6 mb-2" />
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
                  account and remove your data from our servers. To confirm, please verify your identity.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4 space-y-4">
                <RadioGroup value={authMethod} onValueChange={(val: any) => setAuthMethod(val)} className="grid grid-cols-3 gap-2">
                    <Label htmlFor="del-password-auth" className={cn('flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary')}>
                        <RadioGroupItem value="password" id="del-password-auth" className="sr-only"/>
                        <KeyRound className="h-4 w-4"/>
                    </Label>
                    <Label htmlFor="del-biometric-auth" className={cn('flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary')}>
                        <RadioGroupItem value="biometric" id="del-biometric-auth" className="sr-only"/>
                        <Fingerprint className="h-4 w-4"/>
                    </Label>
                    <Label htmlFor="del-otp-auth" className={cn('flex items-center justify-center gap-2 cursor-pointer rounded-md border p-2 hover:bg-accent hover:text-accent-foreground has-[:checked]:border-primary')}>
                        <RadioGroupItem value="otp" id="del-otp-auth" className="sr-only"/>
                        <Mail className="h-4 w-4"/>
                    </Label>
                </RadioGroup>
                {authMethod === 'password' && (
                    <div className="space-y-2">
                    <Label htmlFor="password-confirm-delete">Password</Label>
                    <Input id="password-confirm-delete" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                    </div>
                )}
                {authMethod === 'biometric' && (
                    <Button variant="outline" className="w-full justify-center gap-2"><Fingerprint />Confirm with Biometrics</Button>
                )}
                {authMethod === 'otp' && (
                    <div className="space-y-2">
                    <Label htmlFor="otp-confirm-delete">Email OTP</Label>
                    <div className="flex gap-2">
                        <Input id="otp-confirm-delete" type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit code" />
                        <Button type="button" variant="secondary" onClick={handleSendOtp} disabled={isOtpSent}>{isOtpSent ? 'Resend' : 'Send Code'}</Button>
                    </div>
                    </div>
                )}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setPassword('')}>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={authMethod === 'password' && !password}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
