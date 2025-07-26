// /src/components/profile/referral-settings.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Copy, Check, Share2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ReferralSettings() {
  const [referralCode, setReferralCode] = useState('BETA-USER-123');
  const [isReferralCustomized, setIsReferralCustomized] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const referralLink = `https://betweena.app/signup?ref=${referralCode}`;

  const handleCustomizeReferral = () => {
    setIsReferralCustomized(true);
    toast({
      title: 'Referral Code Updated!',
      description: 'Your new code is now active.',
    });
  };

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
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                   You can only customize your referral code once. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Warning: This affects your earnings.</p>
                  <p>Changing your code means you will no longer be credited for deals associated with your old code.</p>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleCustomizeReferral}>Confirm and Set Code</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
}
