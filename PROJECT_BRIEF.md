<!-- /PROJECT_BRIEF.md -->
# Betweena: Project Brief & Requirements

*This document is the single source of truth for the "Betweena" application's features, design, and technical specifications. It is intended for all team members, including developers, designers, and project managers.*

---

## 1. High-Level Concept

**Betweena** is a secure escrow platform designed for social commerce and freelancers in the African market. The core idea is to hold a buyer's payment securely until the seller delivers the agreed-upon goods or services, releasing the funds only when the buyer confirms satisfaction. This builds trust and eliminates scam risks.

**Target Audience:**
*   Freelancers (designers, developers, writers).
*   Social media vendors (selling on Instagram, Facebook, WhatsApp etc).
*   Their clients and customers.

### Core Pillars
1.  **Trust & Clarity:** The UI must be professional, simple, and build user confidence. We avoid jargon and make complex financial operations feel safe and understandable.
2.  **Action-Oriented Design:** The application should proactively guide users on what to do next. Dashboards and key pages must highlight required actions.
3.  **Simplicity & Efficiency:** We streamline complex processes like deal creation into simple, intuitive steps.

---

## 2. Style and Branding

### Color Palette
The color scheme is designed to feel professional, trustworthy, and clean.

-   **Primary (`#3399FF` / `hsl(210, 70%, 50%)`):** A vibrant, confident blue used for primary actions and active states.
-   **Background (`#F0F5FF` / `hsl(210, 20%, 95%)`):** A light, desaturated blue that provides a clean backdrop.
-   **Accent (`#33CCCC` / `hsl(180, 60%, 40%)`):** An energetic cyan used for secondary highlights.
-   **Destructive (`hsl(0, 84.2%, 60.2%)`):** A standard red reserved for warnings and destructive actions.

### Typography
-   **Body Font:** `Inter`, a clean and highly readable sans-serif font.
-   **Headline Font:** `Inter` (Bold weight). Applied to all major headings (`<h1>`, `CardTitle`) for clear visual hierarchy.

### Iconography
-   **Library:** We exclusively use `lucide-react` for a consistent, modern visual language.

---

## 3. Core User Flows & Feature Implementation

### 3.1. Deal Lifecycle & Statuses
Our deal lifecycle is designed to be clear and secure:

1.  **`pending`**: A deal is created and awaits acceptance and funding from the buyer.
2.  **`inHolding`**: The deal is accepted and funded. The money is secured by Betweena. The seller is notified to begin work.
3.  **`delivered`**: The seller marks the deal as delivered. The buyer is notified.
4.  **`in_review`**: The deal is now in the buyer's hands to verify that the goods/services meet the acceptance criteria.
5.  **`completed`**: The buyer accepts the delivery, and funds are released to the seller.
6.  **`dispute`**: If there's a disagreement, the deal is paused for manual intervention.
7.  **`cancelled`**: The deal is terminated before completion.
8. 

### 3.2. Authentication & Onboarding
*   **Pages:** `login`, `signup`, and a multi-step `onboarding` page.
*   **Functionality:**
    *   Firebase Authentication (Email/Password & Google Sign-In).
    *   `AuthContext` manages global user state.
    *   A `ProtectedRoute` wraps the `/dashboard` layout.
    *   The `/onboarding` page collects user/business details after the first sign-up.

### 3.3. Dashboard (`/dashboard`)
*   **Layout:** Main layout with a sidebar (desktop) and a top nav with a hamburger menu (mobile).
*   **Main Page (`/dashboard/page.tsx`):**
    *   **Summary Cards:** "Your Balance" and "Money on Hold".
    *   **Referral Ranks:** A leaderboard of top referrers.
    *   **Deals Needing Attention:** A prominent section highlighting deals with `in_review` or `dispute` status.
    *   **Recent Transactions:** A list of the latest wallet activities.

### 3.4. Deals Management (`/dashboard/deals`)
*   **List View (`/page.tsx`):**
    *   Display all deals in a `Table` with search and filtering.
    *   Use colored `Badge` components for deal statuses.
*   **Create View (`/create/page.tsx`):**
    *   A multi-step form to create a new deal.
    *   Steps: 1. Your Role (Buyer/Seller), 2. Deal Details (Title, Images, Acceptance Criteria), 3. Counterparty Info, 4. Amount & Terms, 5. Review.
    *   Include a (currently placeholder) "Smart Start" AI feature.
*   **Detail View (`/[id]/page.tsx`):**
    *   Display all deal details, timeline, and messages.
    *   Show dynamic action buttons based on the deal's status and user's role (e.g., "Accept & Fund", "Mark as Delivered").
    *   Use `AlertDialog` for critical confirmation actions.
    *   Display a vertical timeline of the deal's history.

### 3.5. Wallet (`/dashboard/wallet`)
*   Display "Available Money" and "Money on Hold" cards.
*   Include "Add Funds" and "Withdraw Funds" buttons that open `Dialog` modals.
*   The "Withdraw" dialog has "Standard" and "Instant" payout options (freemium placeholder).
*   Show a list of all wallet transactions.

### 3.6. Profile (`/dashboard/profile`)
*   Use a `Tabs` component with the following sections:
    *   **Profile:** Manage personal/business info. Allow the user to set their unique "Betweena ID" *only once*.
    *   **Payments:** Manage withdrawal methods (Mobile Money, Bank Account).
    *   **Referrals:** Allow the user to customize their referral code *only once*.
    *   **Subscription:** Show the user's current plan ("Free" or "Pro") and allow upgrades.
    *   **Settings:** Manage app theme, password, and account deletion.

---

## 4. Technology Stack & Code Quality

### Tech Stack
*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **UI:** React with shadcn/ui components and Tailwind CSS
*   **Authentication:** Firebase Authentication
*   **Database (for mock services):** In-memory data in `src/lib/data.ts`.
*   **AI Functionality:** Genkit/OpenAI
*   **Icons:** `lucide-react`

### Code Quality
*   **Component Modularity:** Create small, reusable components.
*   **Services Layer:** Abstract mock data access into a `services` layer (`src/lib/services/*.ts`).
*   **Error Handling:** Gracefully handle cases where data is not found.
*   **Environment Variables:** Use `.env.local` for all Firebase credentials.

---

## 5. Backend Roadmap (MVP)

This section outlines the critical tasks for transitioning from mock data to a live, market-ready product.

### 5.1. Priority 1: Backend & Database Integration
*   [ ] **Set up Database:** Configure the primary database.
*   [ ] **Refactor Service Layer:** Rewrite all functions in `src/lib/services/*.ts` to perform real CRUD operations against database collections (`deals`, `users`, `transactions`, etc.).
*   [ ] **User Data Persistence:** Ensure user profile and onboarding data are saved to and fetched from the database, keyed by the user's Auth UID.

### 5.2. Priority 2: Payment Gateway Integration
*   [ ] **Choose a Provider:** Select a payment gateway (e.g., Paystack, Stripe).
*   [ ] **Implement "Add Funds":** Connect the "Add Funds" dialog to the payment provider.
*   [ ] **Implement Withdrawals:** Build backend logic withdrawals.
*   [ ] **Webhooks:** Create secure webhook endpoints to listen for events from the payment provider (e.g., `payment.successful`).

### 5.3. Priority 3: Core Feature Implementation
*   [ ] **Implement AI "Smart Start":** Connect the Genkit AI placeholder in the "Create Deal" flow. (this can wait)
*   [ ] **Real-time Notifications:** Implement a notification system.
*   [ ] **Messaging System:** Connect the in-deal messaging UI to a real-time database.
