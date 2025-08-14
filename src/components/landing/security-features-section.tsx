// /src/components/landing/security-features-section.tsx
'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { KeyRound, Lock, ShieldCheck } from 'lucide-react';

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <Card className="h-full">
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

export function SecurityFeaturesSection() {
    return (
        <section className="bg-background py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-headline">Your Security is Our Priority</h2>
                    <p className="mt-2 text-lg text-muted-foreground">We are committed to making online transactions safe and transparent for everyone.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                   <BenefitCard
                        icon={<KeyRound className="h-6 w-6"/>}
                        title="Your PIN is Private"
                        description="We will never ask for your MoMo PIN. Payments are approved securely on your own phone via a prompt from your provider."
                   />
                   <BenefitCard
                        icon={<Lock className="h-6 w-6"/>}
                        title="Secure Escrow"
                        description="Your money is held safely in a secure, regulated account until you confirm you're satisfied with the deal. No surprises."
                   />
                   <BenefitCard
                        icon={<ShieldCheck className="h-6 w-6"/>}
                        title="Data Privacy"
                        description="We use bank-grade security and data encryption to protect your personal and financial information at all times."
                   />
                </div>
            </div>
        </section>
    )
}
