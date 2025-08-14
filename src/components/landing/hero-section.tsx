// /src/components/landing/hero-section.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Landmark } from "lucide-react";

const heroImages = [
    { src: "/hero.png", alt: "A fashion designer at her shop", hint: "doing transaction on phone" },
    { src: "/hero2.png", alt: "Freelancer working on a laptop", hint: "freelancer laptop" },
];

interface HeroSectionProps {
  handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function HeroSection({ handleSmoothScroll }: HeroSectionProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) { return }
        setCurrent(api.selectedScrollSnap())
        const handleSelect = (api: CarouselApi) => setCurrent(api.selectedScrollSnap())
        api.on("select", handleSelect)
        return () => { api.off("select", handleSelect) }
    }, [api])
    
    return (
        <section id="hero" className="bg-background py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <div className="text-center md:text-left animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
                            Secure Your Sale. Guarantee Your Payment.
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
                            Tired of being scammed online? Maybe you’ve delivered a product and
                            never got paid. Or sent money and never got what you bought.
                            <br />
                            <strong>Betweena</strong> protects both sides!
                            <br />
                        </p>

                        <div className="mt-8">
                            <Button size="lg" asChild>
                                <a href="#waitlist-form" onClick={handleSmoothScroll}>Join the Waitlist Now</a>
                            </Button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm font-medium text-muted-foreground">
                            WORKS WITH YOUR FAVOURITE NETWORK
                            </p>
                            <div className="mt-2 flex items-center justify-center gap-4">
                            <Image
                                src="/mtn.png"
                                alt="MTN Mobile Money"
                                width={48}
                                height={32}
                                className="h-8 w-auto object-contain"
                            />
                            <Image
                                src="/telecel.png"
                                alt="Telecel Cash"
                                width={48}
                                height={32}
                                className="h-8 w-auto object-contain"
                            />
                            <Image
                                src="/atm.png"
                                alt="AirtelTigo Money"
                                width={48}
                                height={32}
                                className="h-8 w-auto object-contain"
                            />
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Landmark className="h-5 w-5" />
                                <span className="text-sm font-semibold">Bank</span>
                            </div>
                            </div>

                            <p className="text-sm font-medium text-muted-foreground mt-4">
                            COMING SOON ON
                            </p>
                            <div className="mt-2 flex items-center justify-center gap-4">
                            <Image
                                src="/ios.png"
                                alt="iOS App coming soon"
                                width={240}
                                height={80}
                                className="h-10 w-auto object-contain"
                            />
                            <Image
                                src="/android.png"
                                alt="Android App coming soon"
                                width={240}
                                height={80}
                                className="h-10 w-auto object-contain"
                            />
                            </div>
                        </div>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                        <Carousel
                            className="w-full max-w-xl mx-auto"
                            opts={{ loop: true }}
                            plugins={[plugin.current]}
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                            setApi={setApi}
                        >
                            <CarouselContent>
                                {heroImages.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <Image
                                            src={image.src}
                                            width={600}
                                            height={400}
                                            alt={image.alt}
                                            className="rounded-lg shadow-lg"
                                            data-ai-hint={image.hint}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden sm:flex" />
                            <CarouselNext className="hidden sm:flex" />
                        </Carousel>
                        <div className="py-2 text-center text-sm text-muted-foreground">
                            <div className="flex justify-center gap-2 mt-4">
                                {heroImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => api?.scrollTo(index)}
                                        className={cn("h-2 w-2 rounded-full", current === index ? "bg-primary" : "bg-primary/20")}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
