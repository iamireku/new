// /src/components/landing/use-cases-section.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Paintbrush, Briefcase, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

const benefits = [
    {
        icon: <Paintbrush className="h-6 w-6"/>,
        title: "Freelancers & Creatives",
        description: "Stop chasing invoices. Secure your payment before you start work and get paid instantly upon approval. Focus on your craft, not your collections."
    },
    {
        icon: <Briefcase className="h-6 w-6"/>,
        title: "Service Providers",
        description: "Secure client projects and manage payments with confidence. Our clear audit trail simplifies accounting and builds trust with your clients."
    },
    {
        icon: <ShoppingCart className="h-6 w-6"/>,
        title: "Online & Social Commerce",
        description: "Buying or selling on Instagram, Facebook, or WhatsApp? Use Betweena to eliminate the risk of scams. Pay only when you get what you ordered."
    }
];

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

export function UseCasesSection() {
    const [benefitsApi, setBenefitsApi] = useState<CarouselApi>()
    const [benefitsCurrent, setBenefitsCurrent] = useState(0)

    useEffect(() => {
        if (!benefitsApi) { return }
        setBenefitsCurrent(benefitsApi.selectedScrollSnap())
        const handleSelect = (api: CarouselApi) => setBenefitsCurrent(api.selectedScrollSnap())
        benefitsApi.on("select", handleSelect)
        return () => { benefitsApi.off("select", handleSelect) }
    }, [benefitsApi])

    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-headline">Built for the Modern African Economy</h2>
                    <p className="mt-2 text-lg text-muted-foreground">For sellers who want assurance, and buyers who want security.</p>
                </div>
                <Carousel
                    opts={{ align: "start" }}
                    className="w-full md:hidden"
                    setApi={setBenefitsApi}
                >
                    <CarouselContent className="-ml-4">
                        {benefits.map((benefit, index) => (
                            <CarouselItem key={index} className="pl-4">
                                <div className="p-1 h-full">
                                    <BenefitCard icon={benefit.icon} title={benefit.title} description={benefit.description} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="py-2 text-center text-sm text-muted-foreground md:hidden">
                    <div className="flex justify-center gap-2 mt-4">
                        {benefits.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => benefitsApi?.scrollTo(index)}
                                className={cn("h-2 w-2 rounded-full", benefitsCurrent === index ? "bg-primary" : "bg-primary/20")}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="hidden md:grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                   {benefits.map((benefit, index) => (
                        <BenefitCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
                   ))}
                </div>
            </div>
        </section>
    )
}
