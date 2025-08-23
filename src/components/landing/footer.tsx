// /src/components/landing/footer.tsx
'use client';
import Link from 'next/link';
import { Handshake, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-background py-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-6 gap-6 text-center md:text-left">
                <div className="flex gap-4">
                    <a href="https://x.com/betweena_app" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <Twitter className="h-5 w-5" />
                    </a>
                    <a href="https://facebook.com/betweena" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <Facebook className="h-5 w-5" />
                    </a>
                    <a href="https://instagram.com/betweena_app" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    <Instagram className="h-5 w-5" />
                    </a>
                    <a href="mailto:asante.isaac@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                        <Mail className="h-4 w-4"/>
                    </a>
                </div>
                 <div className="flex gap-4 text-sm">
                    <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground">
                    Terms
                    </Link>
                    <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground">
                    Privacy
                    </Link>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Handshake className="h-5 w-5" />
                    <span>Betweena &copy; {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    )
}
