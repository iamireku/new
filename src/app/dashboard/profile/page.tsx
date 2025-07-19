'use client';

import { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Copy, Check, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const [referralCode, setReferralCode] = useState('BETA-USER-123');
  const [isReferralCustomized, setIsReferralCustomized] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCustomizeReferral = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReferralCustomized(true);
    toast({
      title: 'Referral Code Updated!',
      description: 'Your new referral code is now active.',
    });
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
        // User cancelled the share or an error occurred
        console.error('Sharing failed:', error);
      }
    } else {
        // Fallback for browsers that don't support the Web Share API
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
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="referral">Referrals</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="user@example.com" disabled />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="referral">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Code</CardTitle>
              <CardDescription>
                {isReferralCustomized
                  ? 'Share your unique code to earn rewards.'
                  : 'Customize your referral code once. This action cannot be undone.'}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleCustomizeReferral}>
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
                  <Button type="submit">Customize and Lock Code</Button>
                </CardFooter>
              )}
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
