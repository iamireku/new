// /src/components/landing/deal-manager-section.tsx
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function DealManagerSection() {
    return (
        <section className="py-10 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-8 grid md:grid-cols-3 gap-8 items-center">
                        <div className="flex justify-center">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                                <AvatarImage src="/jd.png" data-ai-hint="woman smiling portrait" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="md:col-span-2 text-center md:text-left">
                            <h3 className="text-xl font-headline font-bold">Your Personal Deal Manager</h3>
                            <p className="text-muted-foreground mt-2">
                                "Hi, I'm Jane, your dedicated resolution officer. While 99% of deals go smoothly, I'm here to ensure fairness and provide support if a disagreement ever arises. At Betweena, you're never alone."
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
