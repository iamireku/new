// /src/app/dashboard/profile/page.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppSettings } from '@/components/profile/app-settings';
import { PaymentMethods } from '@/components/profile/payment-methods';
import { ProfileForm } from '@/components/profile/profile-form';
import { ReferralSettings } from '@/components/profile/referral-settings';
import { LimitsAndFees } from '@/components/profile/limits-and-fees';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">My Profile</h1>
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="referral">Referrals</TabsTrigger>
          <TabsTrigger value="limits">Limits & Fees</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentMethods />
        </TabsContent>
        <TabsContent value="referral">
          <ReferralSettings />
        </TabsContent>
        <TabsContent value="limits">
          <LimitsAndFees />
        </TabsContent>
        <TabsContent value="settings">
          <AppSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
