// /src/components/dashboard/referral-ranks.tsx
// /src/components/dashboard/referral-ranks.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Copy, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { LeaderboardUser, CurrentUser } from '@/lib/data';

interface ReferralRanksProps {
    leaderboard: LeaderboardUser[];
    currentUser: CurrentUser;
}

export function ReferralRanks({ leaderboard, currentUser }: ReferralRanksProps) {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);
    
    if (!currentUser) {
        return null; // Or a loading state
    }

    const referralLink = `https://betweena.app/signup?ref=${currentUser.referralCode}`;

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
                text: `Use my referral code to sign up: ${currentUser.referralCode}`,
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
    
    const currentUserIndex = leaderboard.findIndex(u => u.name === currentUser.name);
    let displayUsers = [];
    if (currentUserIndex !== -1) {
        const startIndex = Math.max(0, currentUserIndex - 1);
        const endIndex = Math.min(leaderboard.length, currentUserIndex + 2);
        displayUsers = leaderboard.slice(startIndex, endIndex);
    } else {
        displayUsers = leaderboard.slice(0, 3);
    }

    return (
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-headline">Referral Ranks</CardTitle>
             <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {displayUsers.map((user) => (
                    <div key={user.rank} className={cn("flex items-center gap-4 p-2 rounded-lg", {"bg-primary/10": user.name === currentUser.name})}>
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.hint} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.referrals} referrals</p>
                        </div>
                        {user.name === currentUser.name ? (
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard} aria-label="Copy referral link">
                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare} aria-label="Share referral link">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="font-medium text-right w-[72px]">{`#${user.rank}`}</div>
                        )}
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
    );
}
