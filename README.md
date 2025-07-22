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
