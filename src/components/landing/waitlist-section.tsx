// /src/components/landing/waitlist-section.tsx
'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [platform, setPlatform] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzaT0E5vvgAi2CQQDPiHT6EUeSXrT5jldkaGbc66pGmEBCaRTQPY_JgpSaWrR4qKLy4/exec";
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const url = `${GOOGLE_SCRIPT_URL}?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}&platform=${encodeURIComponent(platform)}`;
      
      const response = await fetch(url, {
          method: 'GET',
          mode: 'no-cors' // Important to prevent CORS errors
      });

      // Since we use 'no-cors', we can't read the response. We optimistically assume success.
      setSubmitMessage('Thank you for joining! Check your email for a confirmation and a link to our private WhatsApp community.');
      setEmail('');
      setRole('');
      setPlatform('');

    } catch (error) {
      console.error('Error submitting form:', error);
      // A true failure here is likely a network issue. The optimistic message is usually fine.
      setSubmitMessage('An error occurred. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col w-full max-w-2xl mx-auto md:mx-0 gap-4">
        <div className="relative">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className={`flex-1 text-base ${emailError ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-500">{emailError}</p>
          )}
        </div>
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


export function WaitlistSection() {
    return (
        <section id="waitlist-form" className="py-20 md:py-32 bg-background">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold font-headline">Ready to Transact with Confidence?</h2>
                <p className="mt-4 text-lg text-muted-foreground">Join thousands of savvy individuals and businesses In Ghana and across Africa securing their payments.</p>
                <div className="mt-8 max-w-2xl mx-auto">
                    <WaitlistForm />
                </div>
            </div>
        </section>
    )
}
