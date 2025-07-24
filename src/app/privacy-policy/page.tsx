// /src/app/privacy-policy/page.tsx
import { AppLogo } from '@/components/AppLogo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
       <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 bg-secondary">
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

      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-4xl py-16 px-4 md:px-6">
          <h1 className="text-4xl font-headline font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 id="introduction">1. Introduction</h2>
            <p>
              This Privacy Policy describes how Betweena ("we", "us", "our") collects, uses, and shares information about you when you use our services. By using our platform, you agree to the collection and use of information in accordance with this policy.
            </p>

            <h2 id="collection">2. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, create a deal, or contact us for support. This may include:</p>
            <ul>
              <li><strong>Personal Information:</strong> Your name, email address, password, date of birth.</li>
              <li><strong>Business Information:</strong> Your business name, industry, and role.</li>
              <li><strong>Financial Information:</strong> Your mobile money and/or bank account details for payouts. We do not store your full payment card information.</li>
              <li><strong>Transaction Information:</strong> Details about the deals you create and participate in.</li>
            </ul>
             <p>We also collect information automatically when you use our services, such as your IP address and device information.</p>

            <h2 id="use">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Provide, maintain, and improve our services.</li>
                <li>Process transactions and send you related information.</li>
                <li>Verify your identity and prevent fraud.</li>
                <li>Communicate with you about products, services, and events.</li>
                <li>Resolve disputes and provide customer support.</li>
            </ul>

            <h2 id="sharing">4. How We Share Your Information</h2>
            <p>We may share your information with third parties in the following situations:</p>
            <ul>
                <li>With the other party in a deal to facilitate the transaction.</li>
                <li>With vendors and service providers who need access to such information to carry out work on our behalf (e.g., payment processors).</li>
                <li>In response to a request for information if we believe disclosure is in accordance with any applicable law or legal process.</li>
            </ul>

            <h2 id="security">5. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.
            </p>

            <h2 id="rights">6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. You can manage your account information from your profile settings page.
            </p>
            
            <h2 id="cookies">7. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
            </p>

            <h2 id="changes">8. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
