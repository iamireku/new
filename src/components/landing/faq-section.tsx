// /src/components/landing/faq-section.tsx
'use client';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

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

export function FaqSection() {
    return (
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
    )
}
