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
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppSettings() {
  const { theme, setTheme } = useTheme();

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
  );
}
