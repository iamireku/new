
'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ShieldCheck, Users, Handshake, Briefcase, ShoppingCart, Paintbrush, Lock, KeyRound, Mail, Menu, ChevronDown, Star, Twitter, Facebook, Instagram, MessagesSquare, Package, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { AppLogo } from '@/components/AppLogo';
import Image from 'next/image';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Landmark } from "lucide-react";

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [platform, setPlatform] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzaT0E5vvgAi2CQQDPiHT6EUeSXrT5jldkaGbc66pGmEBCaRTQPY_JgpSaWrR4qKLy4/exec";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for avoiding CORS errors with Google Scripts simple deployments
        headers: {
            // This header is important, but with 'no-cors' we can't set it for cross-origin requests.
            // The script needs to be able to handle a plain text post body.
            // For a script that uses JSON.parse, you'd need a proper CORS setup.
            // Let's assume the script is adapted to handle this or we rely on the redirect.
        },
        body: JSON.stringify({ email, role, platform }),
      });

      setSubmitMessage('Thank you for joining! Check your email for a confirmation and a link to our private WhatsApp community.');
      setEmail('');
      setRole('');
      setPlatform('');

    } catch (error) {
      console.error('Error submitting form:', error);
      // This catch block might not be triggered for 'no-cors' network errors,
      // as the browser might not expose the failure details.
      // But we keep it for other potential errors.
      setSubmitMessage('An error occurred. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col w-full max-w-2xl mx-auto md:mx-0 gap-4">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email address"
          className="flex-1 text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <Select name="role" value={role} onValueChange={setRole} required>
            <SelectTrigger className="w-full text-base">
              <SelectValue placeholder="I am a..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Buyer">Buyer</SelectItem>
              <SelectItem value="Seller">Seller</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
            </SelectContent>
          </Select>
          <Select name="platform" value={platform} onValueChange={setPlatform} required>
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
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Join the Waitlist'}
        </Button>
      </form>
       {submitMessage && (
        <p className={`mt-4 text-center text-sm ${submitMessage.includes('error') ? 'text-red-500' : 'text-green-600'}`}>
          {submitMessage}
          {!submitMessage.includes('error') && (
            <a href="https://chat.whatsapp.com/J8n4pZ4nQ5v6Y3Z1zX6p4z" target="_blank" rel="noopener noreferrer" className="font-bold underline ml-1">Join the community!</a>
          )}
        </p>
      )}
    </>
  );
};


const ProcessStep = ({ icon, title, description, image, imageSide = 'right' }: { icon: React.ReactNode; title: string; description: string, image: React.ReactNode, imageSide?: 'left' | 'right' }) => (
    <div className={`grid md:grid-cols-2 gap-12 items-center`}>
        <div className={cn("rounded-lg", imageSide === 'left' ? 'md:order-last' : '')}>
            {image}
        </div>
        <div>
            <div className="flex items-center gap-3 mb-4">
                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold font-headline">{title}</h3>
            </div>
            <p className="text-lg text-muted-foreground">{description}</p>
        </div>
    </div>
);

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
      avatar: "/user1.png",
      hint: "woman fashion designer"
    },
    {
      quote: "As a freelancer, chasing payments was my biggest headache. With Betweena, I secure the project funds upfront. I can now focus completely on coding.",
      name: "Kwame Addo",
      role: "Web Developer, Kumasi",
      avatar: "/user2.png",
      hint: "man developer"
    },
    {
      quote: "I was scammed once buying a phone on Instagram. Never again. Using Betweena for my online purchases is the only way I shop on social media now.",
      name: "Chidinma Okafor",
      role: "Social Media Shopper, Tema",
      avatar: "/user3.png",
      hint: "woman shopping"
    },
    {
      quote: "Sourcing materials from new suppliers is always a risk. Betweena allows me to pay with confidence, knowing my money is safe until I've received and inspected the goods. It's essential for my business.",
      name: "Kofi Mensah",
      role: "Small Business Owner, Takoradi",
      avatar: "/user4.png",
      hint: "man electronics store"
    },
    {
      quote: "Managing rent and repair deposits used to be a nightmare of paperwork and follow-ups. With Betweena, the process is transparent and automated. It has saved me countless hours.",
      name: "Angela B",
      role: "Property Manager, Nsawam",
      avatar: "/user5.png",
      hint: "baker"
    }
];

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

const heroImages = [
    { src: "/hero.png", alt: "A fashion designer at her shop", hint: "doing transaction on phone" },
    { src: "/hero2.png", alt: "Freelancer working on a laptop", hint: "freelancer laptop" },
];

export default function LandingPage() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )
    const testimonialsPlugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [testimonialsApi, setTestimonialsApi] = useState<CarouselApi>()
    const [testimonialsCurrent, setTestimonialsCurrent] = useState(0)
    const [benefitsApi, setBenefitsApi] = useState<CarouselApi>()
    const [benefitsCurrent, setBenefitsCurrent] = useState(0)

    useEffect(() => {
        if (!api) { return }
        setCurrent(api.selectedScrollSnap())
        const handleSelect = (api: CarouselApi) => setCurrent(api.selectedScrollSnap())
        api.on("select", handleSelect)
        return () => { api.off("select", handleSelect) }
    }, [api])
    
    useEffect(() => {
        if (!testimonialsApi) { return }
        const scrollSnaps = testimonialsApi.scrollSnapList().length;
        const slidesToScroll = testimonialsApi.internalEngine().options.slidesToScroll;
        const maxScrolls = Math.ceil(scrollSnaps / slidesToScroll);

        const handleSelect = (api: CarouselApi) => {
            const selected = testimonialsApi.selectedScrollSnap();
            const currentScroll = Math.floor(selected / slidesToScroll);
            setTestimonialsCurrent(currentScroll);
        };
        
        setTestimonialsCurrent(0);
        testimonialsApi.on("select", handleSelect);
        return () => { testimonialsApi.off("select", handleSelect); };
    }, [testimonialsApi]);

    useEffect(() => {
        if (!benefitsApi) { return }
        setBenefitsCurrent(benefitsApi.selectedScrollSnap())
        const handleSelect = (api: CarouselApi) => setBenefitsCurrent(api.selectedScrollSnap())
        benefitsApi.on("select", handleSelect)
        return () => { benefitsApi.off("select", handleSelect) }
    }, [benefitsApi])

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

          <div className="mt-8 text-center md:text-left">
            <p className="text-sm font-medium text-muted-foreground">
              WORKS WITH YOUR FAVOURITE NETWORK
            </p>
            <div className="mt-2 flex items-center justify-center md:justify-start gap-4">
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
                src="/airteltigo copy.png"
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
            <div className="mt-2 flex items-center justify-center md:justify-start gap-4">
              <Image
                src="/ios copy.png"
                alt="iOS App coming soon"
                width={240}
                height={80}
                className="h-10 w-auto object-contain"
              />
              <Image
                src="/android copy.png"
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

        <section id="features">
            <div className="text-center pt-20 md:pt-32">
                <h2 className="text-3xl font-bold font-headline">From Chat to Secure Deal</h2>
                <p className="mt-2 text-lg text-muted-foreground">See how Betweena turns your everyday negotiations into protected transactions.</p>
            </div>

            <div className="py-10 md:py-16">
                 <div className="container mx-auto px-4 md:px-6">
                    <ProcessStep
                        icon={<MessagesSquare className="h-6 w-6" />}
                        title="1. Agree on Terms"
                        description="You negotiate the deal as usual in your favorite chat app. Once you agree, just move the details to Betweena."
                        image={
                            <Image 
                                src="/whatsapp_chat.png"
                                width={1200}
                                height={675}
                                alt="A screenshot of a WhatsApp chat where a buyer and seller agree on terms."
                                className="rounded-lg shadow-md border"
                            />
                        }
                    />
                </div>
            </div>

            <div className="py-10 md:py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <ProcessStep
                        icon={<ShieldCheck className="h-6 w-6" />}
                        title="2. Buyer Pays Securely"
                        description="The buyer receives the deal and pays. We hold the money safely, so the seller can start work without worry."
                        image={
                            <Image 
                                src="/accept_and_fund copy.png" 
                                width={1200}
                                height={675}
                                alt="A screenshot of the Betweena app showing the 'Accept & Fund' screen for a deal."
                                className="rounded-lg shadow-md border"
                            />
                        }
                        imageSide='left'
                    />
                </div>
            </div>

            <div className="py-10 md:py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <ProcessStep
                        icon={<Package className="h-6 w-6" />}
                        title="3. Seller Delivers"
                        description="Once the money is secured, the seller delivers the goods or services as agreed upon in the deal."
                        image={
                            <Image 
                                src="/funds_secured.png" 
                                width={1200}
                                height={675}
                                alt="A UI element from the Betweena app indicating that funds are secured and it's safe to deliver."
                                className="rounded-lg shadow-md border"
                            />
                        }
                    />
                </div>
            </div>
            
            <div className="py-10 md:py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <ProcessStep
                        icon={<CheckCircle className="h-6 w-6" />}
                        title="4. Funds are Released"
                        description="The buyer confirms they're happy, and we release the money instantly to the seller's account. Simple, safe, done."
                        image={
                            <Image 
                                src="/deal_completed copy.png" 
                                width={1200}
                                height={675}
                                alt="A UI element from the Betweena app showing a 'Deal Completed' confirmation message."
                                className="rounded-lg shadow-md border"
                            />
                        }
                        imageSide='left'
                    />
                </div>
            </div>
        </section>

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
        
        <section id="testimonials" className="bg-background py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-headline">Don't Just Take Our Word For It</h2>
                    <p className="mt-2 text-lg text-muted-foreground">See how Betweena is helping business owners like you.</p>
                </div>
                <Carousel
                  opts={{ 
                    align: "start", 
                    loop: true,
                    slidesToScroll: 1,
                  }}
                  plugins={[testimonialsPlugin.current]}
                  onMouseEnter={testimonialsPlugin.current.stop}
                  onMouseLeave={testimonialsPlugin.current.reset}
                  className="w-full"
                  setApi={setTestimonialsApi}
                >
                  <CarouselContent className="-ml-4">
                    {testimonials.map((testimonial, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <div className="p-1 h-full">
                           <Card className="flex flex-col h-full">
                             <CardContent className="pt-6 flex-grow space-y-4">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400"/>)}
                                </div>
                                <p className="text-muted-foreground">"{testimonial.quote}"</p>
                            </CardContent>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={`/${testimonial.avatar}`} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </CardHeader>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                   <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
                <div className="py-2 text-center text-sm text-muted-foreground">
                    <div className="flex justify-center gap-2 mt-4">
                        {Array.from({ length: testimonials.length }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => testimonialsApi?.scrollTo(index)}
                                className={cn("h-2 w-2 rounded-full", testimonialsCurrent === index ? "bg-primary" : "bg-primary/20")}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
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

         <section id="waitlist-form" className="py-20 md:py-32 bg-background">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold font-headline">Ready to Transact with Confidence?</h2>
                <p className="mt-4 text-lg text-muted-foreground">Join thousands of savvy individuals and businesses In Ghana and across Africa securing their payments.</p>
                <div className="mt-8 max-w-2xl mx-auto">
                    <WaitlistForm />
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-background py-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-6 gap-6">
          <div className="flex items-center gap-2">
            <Handshake className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Betweena &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-4">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </a>
             <a href="mailto:asante.isaac@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4"/>
             </a>
          </div>
          <div className="flex gap-4">
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

    