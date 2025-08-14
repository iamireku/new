// /src/components/landing/testimonials-section.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export function TestimonialsSection() {
    const testimonialsPlugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )
    const [testimonialsApi, setTestimonialsApi] = useState<CarouselApi>()
    const [testimonialsCurrent, setTestimonialsCurrent] = useState(0)

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

    return (
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
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
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
    )
}
