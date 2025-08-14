// /src/app/page.tsx
'use client';

import React from 'react';
import { AppLogo } from '@/components/AppLogo';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import modularized components
import { HeroSection } from '@/components/landing/hero-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { DealManagerSection } from '@/components/landing/deal-manager-section';
import { SecurityFeaturesSection } from '@/components/landing/security-features-section';
import { UseCasesSection } from '@/components/landing/use-cases-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { FaqSection } from '@/components/landing/faq-section';
import { WaitlistSection } from '@/components/landing/waitlist-section';
import { Footer } from '@/components/landing/footer';

export default function LandingPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <header className="sticky top-0 z-50 container mx-auto flex h-20 items-center justify-between px-4 md:px-6 bg-secondary">
        <AppLogo />
        <nav className="hidden md:flex items-center gap-4">
           <a href="#features" onClick={handleSmoothScroll} className={cn(buttonVariants({ variant: "ghost" }))}>How it Works</a>
           <a href="#testimonials" onClick={handleSmoothScroll} className={cn(buttonVariants({ variant: "ghost" }))}>Testimonials</a>
           <a href="#faq" onClick={handleSmoothScroll} className={cn(buttonVariants({ variant: "ghost" }))}>FAQ</a>
          <Button asChild>
            <a href="#waitlist-form">Join Waitlist</a>
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
                    <a href="#features" onClick={handleSmoothScroll} className="text-muted-foreground hover:text-foreground">
                        How it Works
                    </a>
                    <a href="#testimonials" onClick={handleSmoothScroll} className="text-muted-foreground hover:text-foreground">
                        Testimonials
                    </a>
                    <a href="#faq" onClick={handleSmoothScroll} className="text-muted-foreground hover:text-foreground">
                        FAQ
                    </a>
                    <Button asChild size="lg" className="w-full mt-4">
                        <a href="#waitlist-form" onClick={handleSmoothScroll}>Join Waitlist</a>
                    </Button>
                </nav>
            </SheetContent>
        </Sheet>
    </header>
        <main className="flex-1">
          <HeroSection handleSmoothScroll={handleSmoothScroll} />
          <HowItWorksSection />
          <DealManagerSection />
          <SecurityFeaturesSection />
          <UseCasesSection />
          <TestimonialsSection />
          <FaqSection />
          <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}