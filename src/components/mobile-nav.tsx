'use client';

import Link from 'next/link';
import { useNav } from '@/contexts/nav-context';

export function MobileNav() {
  const { isMobileNavOpen, closeMobileNav } = useNav();

  const handleLinkClick = () => {
    closeMobileNav();
    // Small delay ensures nav closes before scroll
    setTimeout(() => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <>
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="container flex flex-col items-center justify-center h-full gap-8">
            <Link 
              href="#features" 
              onClick={handleLinkClick}
              className="text-2xl font-headline hover:text-primary transition-colors"
            >
              How it Works
            </Link>
            <Link 
              href="#faqs" 
              onClick={handleLinkClick}
              className="text-2xl font-headline hover:text-primary transition-colors"
            >
              FAQs
            </Link>
            <Link 
              href="#waitlist" 
              onClick={handleLinkClick}
              className="text-2xl font-headline hover:text-primary transition-colors"
            >
              Join Waitlist
            </Link>
          </div>
          <button
            onClick={closeMobileNav}
            className="absolute top-4 right-4 p-2 text-2xl hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}