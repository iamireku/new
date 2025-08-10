// /src/app/page.tsx
'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Users, DollarSign, Handshake, Briefcase, ShoppingCart, Paintbrush, Lock, KeyRound, Mail, Menu, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { AppLogo } from '@/components/AppLogo';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const WaitlistForm = () => {
  // Formspree form ID
  const FORMSPREE_FORM_ID = "manbjyja";

  return (
    <form action={`https://formspree.io/f/${FORMSPREE_FORM_ID}`} method="POST" className="mt-8 flex flex-col w-full max-w-2xl mx-auto md:mx-0 gap-4">
      <Input
        type="email"
        name="email"
        placeholder="Enter your email address"
        className="flex-1 text-base"
        required
      />
      <div className="flex flex-col sm:flex-row gap-2">
         <Select name="role" required>
            <SelectTrigger className="w-full text-base">
              <SelectValue placeholder="I am a..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Buyer">Buyer</SelectItem>
              <SelectItem value="Seller">Seller</SelectItem>
            </SelectContent>
          </Select>
          <Select name="platform" required>
            <SelectTrigger className="w-full text-base">
                <SelectValue placeholder="Preferred Platform..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Web">Web</SelectItem>
                <SelectItem value="Android">Android</SelectItem>
                <SelectItem value="iOS">iOS</SelectItem>
            </SelectContent>
          </Select>
      </div>
      <Button type="submit" size="lg">
        Join the Waitlist
      </Button>
    </form>
  );
};


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

const faqs = [
    {
        question: "How does Betweena make money?",
        answer: "Betweena charges a small, transparent service fee for each successfully completed deal. There are no hidden charges or monthly subscriptions for our standard service. You only pay for what you use."
    },
    {
        question: "Is my money really safe?",
        answer: "Yes. When a buyer pays, the funds are held in a secure, separate account with a regulated financial partner. We only release the money to the seller after the buyer confirms they have received the goods or services as agreed. This eliminates the risk of scams for both parties."
    },
    {
        question: "What happens if there's a disagreement?",
        answer: "If there's an issue with a deal, either party can raise a dispute. This pauses the transaction, and our dedicated resolution team will step in to mediate and ensure a fair outcome for everyone involved."
    },
    {
        question: "When do you plan to launch?",
        answer: "We are working hard to launch in the coming months. By joining the waitlist, you'll be the first to know about our launch date and get exclusive early access."
    }
]

const testimonials = [
    {
      quote: "Betweena has been a game-changer for my business. I no longer worry about getting paid for my designs. It's simple, secure, and gives my clients confidence.",
      name: "Amina Yusuf",
      role: "Fashion Designer, Accra",
      avatar: "https://placehold.co/100x100.png",
      hint: "woman fashion designer"
    },
    {
      quote: "As a freelancer, chasing payments was my biggest headache. With Betweena, I secure the project funds upfront. I can now focus completely on coding.",
      name: "Kwame Addo",
      role: "Web Developer, Kumasi",
      avatar: "https://placehold.co/100x100.png",
      hint: "man developer"
    },
    {
      quote: "I was scammed once buying a phone on Instagram. Never again. Using Betweena for my online purchases is the only way I shop on social media now.",
      name: "Chidinma Okafor",
      role: "Social Media Shopper, Lagos",
      avatar: "https://placehold.co/100x100.png",
      hint: "woman shopping"
    }
];

export default function LandingPage() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <header className="sticky top-0 z-50 container mx-auto flex h-20 items-center justify-between px-4 md:px-6 bg-secondary">
        <AppLogo />
        <nav className="hidden md:flex items-center gap-4">
           <a href="#features" className={cn(buttonVariants({ variant: "ghost" }))}>How it Works</a>
           <a href="#faq" className={cn(buttonVariants({ variant: "ghost" }))}>FAQ</a>
          <Button asChild>
            <Link href="#waitlist">Join Waitlist</Link>
          </Button>
        </nav>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                    <AppLogo />
                    <Link 
                        href="#features" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        How it Works
                    </Link>
                    <Link 
                        href="#faq"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        FAQ
                    </Link>
                    <Link 
                        href="#waitlist"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Join Waitlist
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
      </header>

      <main className="flex-1">
        <section id="waitlist" className="bg-background py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <div className="text-center md:text-left animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
                           The Future of Secure Transactions is Coming Soon
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
                           Betweena is building the safest way for freelancers and online sellers and buyers in Ghana and across Africa to do business. Join our waitlist to get early access and be the first to know when we launch.
                        </p>
                        <WaitlistForm />
                    </div>
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
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
                icon={<DollarSign className="h-8 w-8" />}
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

        <section className="py-20 md:py-32">
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
        
        <section className="bg-background py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-headline">Don't Just Take Our Word For It</h2>
                    <p className="mt-2 text-lg text-muted-foreground">See how Betweena is helping business owners like you.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="flex flex-col">
                            <CardContent className="pt-6 flex-grow">
                                <p className="text-muted-foreground">"{testimonial.quote}"</p>
                            </CardContent>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="faq" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-headline">Frequently Asked Questions</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Got questions? We've got answers.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                         <Collapsible key={index} asChild>
                            <Card>
                                <CollapsibleTrigger asChild>
                                    <button className="flex w-full items-center justify-between p-4 group">
                                        <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                                        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                                    </button>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <CardContent>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </CardContent>
                                </CollapsibleContent>
                            </Card>
                         </Collapsible>
                    ))}
                </div>
            </div>
        </section>

         <section className="py-20 md:py-32">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold font-headline">Ready to Transact with Confidence?</h2>
                <p className="mt-4 text-lg text-muted-foreground">Join thousands of savvy individuals and businesses In Ghana and across Africa securing their payments.</p>
                <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href="#waitlist">Join the Waitlist</Link>
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
             <a href="mailto:asante.isaac@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4"/>
                Partnerships
             </a>
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
