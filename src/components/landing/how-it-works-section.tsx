// /src/components/landing/how-it-works-section.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MessagesSquare, ShieldCheck, Package, CheckCircle } from 'lucide-react';

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

export function HowItWorksSection() {
    return (
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
                                src="/accept_deal.png" 
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
                                src="/deal_final.png" 
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
    )
}
