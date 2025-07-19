import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Users, DollarSign, Handshake } from 'lucide-react';
import Link from 'next/link';
import { AppLogo } from '@/components/AppLogo';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <AppLogo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center md:px-6 md:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline">
            Secure Escrow for Modern Commerce
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
            The trusted intermediary for all your transactions. Simple, secure, and seamless.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Create a Free Account</Link>
            </Button>
            <Button size="lg" variant="secondary">
              Learn More
            </Button>
          </div>
        </section>

        <section className="bg-secondary py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold font-headline">Why Choose Betweena?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="Ironclad Security"
                description="Your funds are held securely in escrow until both parties are satisfied, eliminating the risk of fraud."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Fair for Everyone"
                description="We act as a neutral third party, ensuring a fair and transparent process for both buyers and sellers."
              />
              <FeatureCard
                icon={<DollarSign className="h-10 w-10 text-primary" />}
                title="Simple & Transparent"
                description="A straightforward process with clear fee structures. No hidden costs, no surprises."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-8">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Handshake className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Betweena &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="text-center">
      <CardHeader className="items-center">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
