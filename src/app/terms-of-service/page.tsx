// /src/app/terms-of-service/page.tsx
import { AppLogo } from '@/components/AppLogo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-headline font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 id="introduction">1. Introduction</h2>
            <p>
              Welcome to Betweena ("we", "us", "our"). We provide a secure escrow platform for social commerce and freelancers. By creating an account or using our services, you agree to be bound by these Terms of Service.
            </p>

            <h2 id="accounts">2. User Accounts</h2>
            <p>
              You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2 id="escrow-service">3. Escrow Service</h2>
            <p>
              Betweena's core service is to act as a neutral third party in transactions. When a deal is created and funded by a Buyer, we hold the funds in a secure, non-interest-bearing account. We will only release these funds to the Seller upon confirmation from the Buyer that the goods or services have been delivered according to the agreed-upon Acceptance Criteria, or as otherwise specified in our Dispute Resolution policy.
            </p>

            <h2 id="fees">4. Fees and Payments</h2>
            <p>
              We charge a service fee for each transaction completed on our platform. The fee structure is available on our pricing page and may be updated from time to time. By creating a deal, you agree to pay all applicable fees.
            </p>

            <h2 id="prohibited">5. Prohibited Activities</h2>
            <p>
              You may not use our platform for any illegal or unauthorized purpose, including but not limited to fraud, money laundering, or the sale of illegal goods. We reserve the right to suspend or terminate accounts involved in such activities.
            </p>

            <h2 id="disputes">6. Dispute Resolution</h2>
            <p>
              If a Buyer is unsatisfied with the delivery, they can raise a dispute. This will pause the deal, and our support team will mediate between the Buyer and Seller to reach a resolution. Our decision in such disputes is final and binding.
            </p>

            <h2 id="termination">7. Termination</h2>
            <p>
              You can terminate your account at any time through your profile settings. We reserve the right to suspend or terminate your account if you violate these Terms of Service.
            </p>

            <h2 id="liability">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Betweena shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
            </p>
            
            <h2 id="governing-law">9. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions.
            </p>

            <h2 id="changes">10. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. We will notify you of any changes by posting the new Terms of Service on this page.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
