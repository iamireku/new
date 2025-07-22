
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Check, CheckCircle, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/lib/services/user.service';
import type { CurrentUser } from '@/lib/data';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const proFeatures = [
    'Lower transaction fees',
    'Advanced deal features (milestones, templates)',
    'Enhanced analytics dashboard',
    'Priority support',
    'Add team members to your account',
];

const freeFeatures = [
    'Unlimited deal creation',
    'Standard escrow protection',
    'Standard support',
];


export function SubscriptionPlan() {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [billingCycle, setBillingCycle] = useState('monthly');
    const { toast } = useToast();

    useEffect(() => {
        async function fetchData() {
            const user = await getCurrentUser();
            setCurrentUser(user);
        }
        fetchData();
    }, []);

    const handleUpgrade = () => {
        toast({
            title: 'Upgrade to Pro!',
            description: "You're being redirected to a secure checkout page.",
        });
        // In a real app, you'd redirect to a payment provider like Stripe
    }

    if (!currentUser) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Loading...</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Fetching your subscription details...</p>
                </CardContent>
            </Card>
        );
    }
    
    const isPro = currentUser.plan === 'pro';

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Your Plan</CardTitle>
                    <CardDescription>You are currently on the <span className="font-bold text-primary">{isPro ? 'Pro' : 'Free'}</span> plan.</CardDescription>
                </CardHeader>
                {isPro && (
                     <CardContent>
                        <p>Your subscription is active. Thank you for being a Pro member!</p>
                    </CardContent>
                )}
            </Card>

            <div className="text-center">
                <h2 className="text-2xl font-bold font-headline">Choose the plan that's right for you</h2>
                <div className="mt-4 flex justify-center items-center gap-4">
                    <Label htmlFor="billing-cycle">Monthly</Label>
                    <Switch
                        id="billing-cycle"
                        checked={billingCycle === 'yearly'}
                        onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                    />
                    <Label htmlFor="billing-cycle">Yearly</Label>
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">Save 20%</Badge>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card className={cn("border-2", { "border-muted": isPro })}>
                    <CardHeader>
                        <CardTitle>Free</CardTitle>
                        <CardDescription>For individuals and casual users getting started with secure payments.</CardDescription>
                        <p className="text-4xl font-bold pt-2">GHS 0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <ul className="space-y-2">
                           {freeFeatures.map(feature => (
                                <li key={feature} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{feature}</span>
                                </li>
                           ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full" disabled>Your Current Plan</Button>
                    </CardFooter>
                </Card>
                 <Card className={cn("border-2 border-primary", { "border-muted": !isPro })}>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Pro
                            <Crown className="h-5 w-5 text-yellow-500"/>
                        </CardTitle>
                        <CardDescription>For freelancers, businesses, and power users who demand more.</CardDescription>
                        <p className="text-4xl font-bold pt-2">
                            {billingCycle === 'monthly' ? 'GHS 50' : 'GHS 480'}
                            <span className="text-lg font-normal text-muted-foreground">
                                {billingCycle === 'monthly' ? '/month' : '/year'}
                            </span>
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <ul className="space-y-2">
                           {proFeatures.map(feature => (
                                <li key={feature} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>{feature}</span>
                                </li>
                           ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                       {isPro ? (
                            <Button variant="outline" className="w-full" disabled>Your Current Plan</Button>
                       ) : (
                            <Button className="w-full" onClick={handleUpgrade}>Upgrade to Pro</Button>
                       )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
