<!-- /README.md -->
# Betweena: Secure Escrow for Social Commerce & Freelancers

Welcome to the Betweena project repository. This document outlines the project's current status, roadmap to a Minimum Viable Product (MVP), and instructions for getting started.

## Current Status (Pre-MVP)

The application has a solid foundation with a complete UI and a functional frontend architecture. Key components are in place, but are currently powered by mock data and simulated services.

### What's Implemented:

*   **Technology Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, ShadCN UI, Genkit (for AI placeholders), and Firebase (for authentication).
*   **Core UI & UX:** A comprehensive and responsive user interface is built for all primary user flows.
*   **Mocked User Flows:**
    *   **Dashboard:** Displays summary cards, referral ranks, deals needing attention, and recent transactions.
    *   **Deals Management:** Users can view a list of deals, filter them, and click to see a detailed view of any specific deal.
    *   **Deal Lifecycle:** The UI supports all deal statuses (`pending`, `inHolding`, `in_review`, `completed`, `dispute`, `cancelled`).
    *   **Profile Management:** A multi-tabbed profile section allows users to manage personal info, business details, payment methods, and settings.
*   **Authentication Foundation:**
    *   User sign-up and sign-in are functional using Firebase Authentication (Email/Password & Google Sign-In).
    *   A robust `AuthContext` manages user sessions globally.
    *   The `/dashboard` route and all its children are protected, redirecting unauthenticated users to the login page.
*   **Freemium Model Groundwork:**
    *   The UI for a "Pro" subscription plan is in place.
    *   The withdrawal flow includes options for "Standard" (free) and "Instant" (paid) payouts.

---

## Roadmap to Market-Ready MVP

The following critical tasks must be completed to transition the app from its current state to a live, market-ready product.

### 1. Backend & Database Integration

This is the highest priority. All mock data and services must be replaced with a real backend and database.

-   [ ] **Set up Firestore:** Choose and configure Firestore as our primary database.
-   [ ] **Refactor Service Layer:** Rewrite all functions in `src/lib/services/*.ts` to perform real CRUD (Create, Read, Update, Delete) operations against the Firestore database instead of using the mock `dealsData`.
-   [ ] **User Data Persistence:** Ensure user profile and business information from onboarding and the profile page are saved to and fetched from the database.

### 2. Payment Gateway Integration

To handle real money, we must integrate a secure payment provider.

-   [ ] **Choose a Provider:** Select a payment gateway (e.g., Paystack, Stripe).
-   [ ] **Implement "Add Funds":** Connect the "Add Funds" dialog to the payment provider to handle deposits.
-   [ ] **Implement Withdrawals:** Build the backend logic for processing both "Standard" and "Instant" withdrawals.
-   [ ] **Subscription Billing:** Integrate the "Upgrade to Pro" feature with the provider's recurring billing system.
-   [ ] **Webhooks:** Create secure webhook endpoints to listen for events from the payment provider (e.g., `payment.successful`, `subscription.created`) and update our database accordingly.

### 3. Core Feature Implementation

-   [ ] **Implement AI "Smart Start":** Connect the Genkit AI placeholder in the "Create Deal" flow. This involves creating a Genkit flow that takes a user's natural language description, parses out the key details (amount, counterparty, terms), and pre-fills the form.
-   [ ] **Real-time Notifications:** Implement a notification system (e.g., using Firebase Cloud Messaging) to alert users to critical events like "Deal Accepted," "Funds Released," or "Dispute Raised."
-   [ ] **Messaging System:** The in-deal messaging UI is present but needs to be connected to a real-time database (like Firestore) so messages can be sent and received between parties.

---

## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn
*   A Firebase project

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd [your-repo-name]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    *   Create a copy of `.env.local.example` and rename it to `.env.local`.
    *   Go to your Firebase project settings.
    *   Click on your web app and find the `firebaseConfig` object.
    *   Copy your project's credentials and paste them into the `.env.local` file.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Deployment to Firebase

This project is configured for one-command deployment to **Firebase App Hosting**. Follow these steps to go live.

### Prerequisites

1.  **Install Firebase CLI:** If you don't have it, install it globally.
    ```bash
    npm install -g firebase-tools
    ```
2.  **Firebase Project:** Make sure you have created a Firebase project on the [Firebase Console](https://console.firebase.google.com/).

### Deployment Steps

1.  **Login to Firebase:**
    ```bash
    firebase login
    ```
    This will open a browser window for you to authenticate your account.

2.  **Connect to Your Firebase Project:**
    Run the following command and select your project from the list.
    ```bash
    firebase use --add    ```

3.  **Build the Application:**
    Create a production-ready build of your Next.js app.
    ```bash
    npm run build
    ```

4.  **Deploy!**
    This one command will upload your build and deploy it to Firebase App Hosting.
    ```bash
    firebase apphosting:backends:deploy --id betweena-backend --region us-central1
    ```
    *Note: The first deployment might take a few minutes as Firebase provisions resources.*

After the command finishes, it will give you the live URL for your application. You can now share it with the world!

---

## Connecting a Custom Domain

To make your application accessible at your own domain name (e.g., `www.your-app.com`), follow these steps in the Firebase Console.

1.  **Go to the Firebase Console:**
    Navigate to the [Firebase Console](https://console.firebase.google.com/) and select your project.

2.  **Open the Hosting Dashboard:**
    In the left-hand menu, under the "Build" section, click on **Hosting**.

3.  **Start the "Add Custom Domain" Wizard:**
    Click the **"Add custom domain"** button.

4.  **Enter Your Domain:**
    Type the domain name you own (e.g., `your-domain.com`) and click "Continue". You can also choose to set up a redirect from `your-domain.com` to `www.your-domain.com`.

5.  **Verify Ownership:**
    *   Firebase will give you a **TXT record** (a line of text).
    *   You need to go to your domain registrar's website (e.g., Google Domains, Namecheap, GoDaddy).
    *   In your registrar's DNS management panel, add this TXT record. This proves to Firebase that you own the domain.
    *   DNS changes can take some time to propagate (from a few minutes to a few hours). You can use a tool like [whatsmydns.net](https://whatsmydns.net/) to check the status.

6.  **Add A Records:**
    *   Once your ownership is verified, Firebase will provide you with one or more **IP addresses**.
    *   Go back to your domain registrar's DNS settings.
    *   Create **A records** that point your domain (e.g., `your-domain.com` and `www.your-domain.com`) to the IP addresses provided by Firebase.

7.  **Wait for Provisioning:**
    After you've added the A records, Firebase will begin provisioning an SSL certificate for your domain to ensure it's secure (HTTPS). This process is automatic and can take up to a few hours.

Once complete, your site will be live on your custom domain!
