'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// Replace with your deployed Google Apps Script URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbym5RDectiCaLbdYHhnYuws_r-Kzpedym-Uz9Imsbt3kXCTjOFj1tMGEKLb1iqqPNYu/exec";
const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [platform, setPlatform] = useState('');
  const [company, setCompany] = useState(''); // Honeypot state
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
      const payload = {
        email,
        role,
        platform,
        company, // Include the honeypot field in the payload
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();

      if (result.success) {
        setSubmitMessage("Success! You're on the list. Check your email for a confirmation and a link to our WhatsApp community.");
        setEmail('');
        setRole('');
        setPlatform('');
        setCompany(''); // Reset honeypot field
      } else {
        setSubmitMessage(`Error: ${result.message}`);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col w-full max-w-2xl mx-auto gap-4">
        {/* Honeypot field (hidden from users) */}
        <input 
          type="text" 
          name="company" 
          style={{ display: 'none' }} 
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          readOnly={isSubmitting} // Prevent changes during submission
        />

        <div className="relative">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className={`flex-1 text-base ${emailError ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-500">{emailError}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select name="role" value={role} onValueChange={setRole} disabled={isSubmitting} required>
            <SelectTrigger className="w-full text-base">
              <SelectValue placeholder="I am a..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Buyer">Buyer</SelectItem>
              <SelectItem value="Seller">Seller</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
            </SelectContent>
          </Select>

          <Select name="platform" value={platform} onValueChange={setPlatform} disabled={isSubmitting} required>
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
        <p className={`mt-4 text-center text-sm ${submitMessage.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
          {submitMessage}
          {submitMessage.includes('Success') && (
            <a
              href="https://chat.whatsapp.com/HDtTegpcd5W3lWjkxSJ9jV?mode=ac_t"
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
