// /src/app/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, Users, DollarSign, Handshake, Briefcase, ShoppingCart, Paintbrush } from 'lucide-react';
import Link from 'next/link';
import { AppLogo } from '@/components/AppLogo';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import React from 'react';


const ProcessStep = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <Card>
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

export default function LandingPage() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 bg-secondary">
        <AppLogo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="bg-background py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
                            Safe Deals for Social Commerce & Freelancers
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
                           Buying on Instagram or selling your services? Betweena holds the payment securely. No more scams. The seller only gets paid when the buyer is happy.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                          <Button size="lg" asChild>
                            <Link href="/signup">Start a Secure Deal</Link>
                          </Button>
                          <Button size="lg" variant="secondary" asChild>
                            <a href="#features">Learn More</a>
                          </Button>
                        </div>
                    </div>
                    <div>
                        <Carousel 
                            className="w-full max-w-xl mx-auto" 
                            opts={{ loop: true }}
                            plugins={[plugin.current]}
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                        >
                            <CarouselContent>
                                <CarouselItem>
                                    <Image
                                        src="/hero.png"
                                        width={600}
                                        height={400}
                                        alt="A fashion desighner at her shop"
                                        className="rounded-lg shadow-lg"
                                        data-ai-hint="doing transaction on phone"
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <Image
                                        src="/hero2.png"
                                        width={600}
                                        height={400}
                                        alt="Freelancer working on a laptop"
                                        className="rounded-lg shadow-lg"
                                        data-ai-hint="freelancer laptop"
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <Image
                                        src="https://placehold.co/600x400.png"
                                        width={600}
                                        height={400}
                                        alt="A person receiving a package"
                                        className="rounded-lg shadow-lg"
                                        data-ai-hint="delivery package"
                                    />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold font-headline">A Simple, Secure Process</h2>
                <p className="mt-2 text-lg text-muted-foreground">Trade with confidence in just four easy steps.</p>
            </div>
            <div className="grid gap-12 md:grid-cols-4">
              <ProcessStep
                icon={<Handshake className="h-8 w-8" />}
                title="1. Agree on Terms"
                description="You and the other party create a deal with clear terms and acceptance criteria."
              />
              <ProcessStep
                icon={<ShieldCheck className="h-8 w-8" />}
                title="2. Buyer Pays Securely"
                description="The buyer funds the deal. We hold the money safely in the middle."
              />
              <ProcessStep
                icon={<Briefcase className="h-8 w-8" />}
                title="3. Seller Delivers"
                description="The seller provides the goods or services as agreed upon in the deal."
              />
               <ProcessStep
                icon={<Users className="h-8 w-8" />}
                title="4. Funds are Released"
                description="The buyer confirms they are happy, and we release the money to the seller. Simple!"
              />
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-headline">Built for the Modern African Economy</h2>
                    <p className="mt-2 text-lg text-muted-foreground">For sellers who want assurance, and buyers who want security.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                   <BenefitCard
                        icon={<Paintbrush className="h-6 w-6"/>}
                        title="Freelancers & Creatives"
                        description="Stop chasing invoices. Secure your payment before you start work and get paid instantly upon approval. Focus on your craft, not your collections."
                   />
                   <BenefitCard
                        icon={<Briefcase className="h-6 w-6"/>}
                        title="Service Providers"
                        description="Secure client projects and manage payments with confidence. Our clear audit trail simplifies accounting and builds trust with your clients."
                   />
                   <BenefitCard
                        icon={<ShoppingCart className="h-6 w-6"/>}
                        title="Online & Social Commerce"
                        description="Buying or selling on Instagram, Facebook, or WhatsApp? Use Betweena to eliminate the risk of scams. Pay only when you get what you ordered."
                   />
                </div>
            </div>
        </section>

         <section className="py-20 md:py-32">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold font-headline">Ready to Transact with Confidence?</h2>
                <p className="mt-4 text-lg text-muted-foreground">Join thousands of savvy individuals and businesses across Africa securing their payments.</p>
                <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href="/signup">Create Your Free Account</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-background py-8">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Handshake className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Betweena &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
