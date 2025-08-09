'use client';

import Link from 'next/link';
import { useNav } from '@/contexts/nav-context';

export function MobileNav() {
  const { isMobileNavOpen, closeMobileNav } = useNav();

  const handleLinkClick = () => {
    closeMobileNav();
    // Small delay to ensure nav closes before scroll happens
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
              className="text-2xl font-headline"
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              onClick={handleLinkClick}
              className="text-2xl font-headline"
            >
              Pricing
            </Link>
            <Link 
              href="#contact" 
              onClick={handleLinkClick}
              className="text-2xl font-headline"
            >
              Contact
            </Link>
          </div>
          <button
            onClick={closeMobileNav}
            className="absolute top-4 right-4 p-2 text-2xl"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}