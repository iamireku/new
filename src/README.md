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

## Instructions for Backend Developer

This section provides a clear roadmap for transitioning the application from its current mock-data state to a production-ready application with a live backend.

### 1. Primary Objective

Your main goal is to **replace all mock services with a live Firestore backend**. All data currently sourced from `/src/lib/data.ts` should be stored and retrieved from Firestore collections.

### 2. Core Tasks Checklist

-   [ ] **Set up Firestore:** Configure Firestore as the primary database in the project's Firebase configuration.
-   [ ] **Refactor Service Layer:** Rewrite all functions in the `/src/lib/services/` directory to perform real CRUD (Create, Read, Update, Delete) operations against Firestore instead of using the mock data arrays.
    -   `deals.service.ts`: Implement `getDeals`, `getDealById`, and `createDeal` to interact with a `deals` collection.
    -   `user.service.ts`: Implement `getSavedPaymentMethods`, `getCurrentUser`, and `getLeaderboard` to interact with `users` and `paymentMethods` collections.
    -   `wallet.service.ts`: Implement `getWalletTransactions` and `getRecentTransactions` to interact with a `transactions` collection.
-   [ ] **User Data Persistence:** Ensure user profile and business information from the onboarding flow (`/src/app/onboarding/page.tsx`) and the profile page (`/src/components/profile/profile-form.tsx`) are saved to and fetched from a `users` collection in Firestore. The user's Firestore document should be keyed by their Firebase Auth UID.
-   [ ] **Data Models:** Use the type definitions in `/src/lib/data.ts` as the schema for your Firestore documents.

### 3. Critical Future Implementations (Post-MVP)

Once the core data services are live, the following features will need backend implementation.

-   [ ] **Payment Gateway Integration:**
    -   Choose and integrate a payment provider (e.g., Paystack, Stripe).
    -   Connect the "Add Funds" and "Withdraw Funds" modals to the provider.
    -   Implement subscription billing for the "Pro" plan.
    -   Create secure webhook endpoints to listen for events from the provider (e.g., `payment.successful`) and update our database accordingly.
-   [ ] **Implement AI "Smart Start":**
    -   Connect the Genkit AI placeholder in the "Create Deal" flow. This involves creating a Genkit flow that takes a user's natural language description, parses out the key details (amount, counterparty, terms), and pre-fills the form.
-   [ ] **Real-time Notifications & Messaging:**
    -   Implement a notification system (e.g., using Firebase Cloud Messaging) for critical deal events.
    -   The in-deal messaging UI needs to be connected to a real-time database (like Firestore) so messages can be sent and received.

---

## Getting Started (for Frontend)

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
