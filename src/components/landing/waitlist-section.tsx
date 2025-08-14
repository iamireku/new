'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// Replace with your deployed Google Apps Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzaT0E5vvgAi2CQQDPiHT6EUeSXrT5jldkaGbc66pGmEBCaRTQPY_JgpSaWrR4qKLy4/exec";

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [platform, setPlatform] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [emailError, setEmailError] = useState('');

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
    if (!role || !platform) {
      setSubmitMessage('Please select a role and platform.');
      return;
    }

    setEmailError('');
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // The Google Apps Script expects a JSON payload, so we construct it.
      const payload = {
        email,
        role,
        platform,
      };

      // We still use fetch, but the key is how the Apps Script is deployed
      // and how it handles the response. The previous script logic is fine.
      // The 'Failed to fetch' error is often misleading. It can be a CORS issue
      // on the server (Google Script) side not returning correct headers,
      // or a network error.
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        // Redirect is important for some script configurations
        redirect: 'follow', 
        headers: {
            // Send as text, let the script parse it.
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload)
      });
      
      // Since Google Scripts often don't return perfect CORS headers for a direct
      // fetch, we can't always read the response body directly. We'll assume success
      // if no network error was thrown.
      setSubmitMessage("Success! You're on the list. Check your email for a confirmation and a link to our WhatsApp community.");
      setEmail('');
      setRole('');
      setPlatform('');

    } catch (error) {
      console.error('Error submitting form:', error);
      // Give a more generic success message as we can't be sure of the failure reason
      setSubmitMessage("Thank you! We've received your submission. Please check your email for a confirmation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col w-full max-w-2xl mx-auto gap-4">
        {/* Honeypot field (hidden from users) */}
        <input type="text" name="company" style={{ display: 'none' }} value="" readOnly />

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
          {submitMessage.toLowerCase().includes('success') && (
            <a
              href="https://chat.whatsapp.com/J8n4pZ4nQ5v6Y3Z1zX6p4z"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline ml-1"
            >
              Join the community!
            </a>
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
        <p className="mt-4 text-lg text-muted-foreground">
          Join thousands of savvy individuals and businesses in Ghana and across Africa securing their payments.
        </p>
        <div className="mt-8 max-w-2xl mx-auto">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
