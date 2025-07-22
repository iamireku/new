# AI Prompt for Generating the "Betweena" Application

## 1. High-Level App Concept

You are to create a web application called **"Betweena"**. It is a secure escrow platform designed for social commerce and freelancers in the African market. The core idea is to hold a buyer's payment securely until the seller delivers the agreed-upon goods or services, releasing the funds only when the buyer confirms satisfaction. This builds trust and eliminates scam risks.

**Target Audience:**
*   Freelancers (designers, developers, writers).
*   Social media vendors (selling on Instagram, Facebook, WhatsApp).
*   Their clients and customers.

**Core Pillars:**
1.  **Trust & Clarity:** The UI must be professional, simple, and build user confidence.
2.  **Action-Oriented Design:** Proactively guide users on what to do next.
3.  **Efficiency:** Streamline complex financial processes.

---

## 2. Technology Stack

*   **Framework:** Next.js (with App Router).
*   **Language:** TypeScript.
*   **UI Library:** React.
*   **Styling:** Tailwind CSS.
*   **Component Library:** shadcn/ui. You must use these components wherever possible for consistency (Buttons, Cards, Dialogs, Inputs, etc.).
*   **Authentication:** Firebase Authentication (Email/Password and Google Sign-In).
*   **Database (for mock services):** Use in-memory data stored in `src/lib/data.ts`.
*   **AI Functionality:** Genkit (placeholders for now).
*   **Icons:** `lucide-react`.

---

## 3. Style and Branding

*   **Primary Color:** `#3399FF` (hsl(210, 70%, 50%)) - A confident blue for primary actions.
*   **Background Color:** `#F0F5FF` (hsl(210, 20%, 95%)) - A light, clean backdrop.
*   **Accent Color:** `#33CCCC` (hsl(180, 60%, 40%)) - A cyan for secondary highlights.
*   **Typography:** Use the `Inter` font for both body and headlines. Headlines (`CardTitle`, `h1`, etc.) must use a bold weight.
*   **Layout:** Clean, structured, with clear information hierarchy. Use `Card` components extensively to group information.

Update `src/app/globals.css` with these HSL values for the CSS variables.

---

## 4. Core User Flows & Feature Implementation

### 4.1. Authentication & Onboarding
*   **Pages:** Create `login`, `signup`, and `onboarding` pages.
*   **Functionality:**
    *   Implement sign-up and sign-in using Firebase Authentication (Email/Password & Google).
    *   Use a React Context (`AuthContext`) to manage global user state.
    *   Create a `ProtectedRoute` component to wrap the `/dashboard` layout, redirecting unauthenticated users to `/login`.
    *   The `/onboarding` page should be a multi-step form to collect user and business details (name, industry, payment methods). This flow should appear after the first sign-up.

### 4.2. Dashboard (`/dashboard`)
*   **Layout:** A main layout with a sidebar (for desktop) and a top navigation bar (with a hamburger menu for mobile). The layout should contain links to Dashboard, Deals, Wallet, and Profile.
*   **Main Page (`/dashboard/page.tsx`):**
    *   **Summary Cards:** Display "Your Balance" and "Money on Hold".
    *   **Referral Ranks:** Show a leaderboard of top referrers.
    *   **Deals Needing Attention:** A prominent section highlighting deals with `in_review` or `dispute` status.
    *   **Recent Transactions:** A list of the latest wallet activities.
    *   **Data Fetching:** Centralize all data fetching for the dashboard in the main page component and pass data down to the child components as props.

### 4.3. Deals Management (`/dashboard/deals`)
*   **List View (`/page.tsx`):**
    *   Display all deals in a `Table`.
    *   Show key details: Title, Party, Date, Status, Amount.
    *   Implement search and filter functionality (by status and user role).
    *   Use colored `Badge` components for deal statuses. Highlight rows for deals needing attention.
*   **Create View (`/create/page.tsx`):**
    *   A multi-step form with a progress bar.
    *   **Steps:** 1. Your Role (Buyer/Seller), 2. Deal Details (Title, Images, Acceptance Criteria), 3. Counterparty Info (Email, Phone, or Betweena ID), 4. Amount & Terms (Amount, Deadline, Location), 5. Review.
    *   Include a "Smart Start" button (placeholder AI feature) that opens a dialog.
*   **Detail View (`/[id]/page.tsx`):**
    *   Display all deal details: overview, acceptance criteria, timeline, and messages.
    *   Show dynamic action buttons based on the deal's status and the user's role (e.g., "Accept & Fund", "Mark as Delivered", "Release Funds", "Raise Dispute").
    *   Use `AlertDialog` for critical confirmation actions.
    *   Display a vertical timeline of the deal's history with icons.

### 4.4. Wallet (`/dashboard/wallet`)
*   Display two main cards: "Available Money" and "Money on Hold".
*   Include "Add Funds" and "Withdraw Funds" buttons that open `Dialog` modals.
*   The "Withdraw" dialog should have options for "Standard" and "Instant" payout (freemium model placeholder).
*   Show a list of all wallet transactions with details (type, date, amount, status).

### 4.5. Profile (`/dashboard/profile`)
*   Use a `Tabs` component to organize the page.
*   **Tabs:**
    *   **Profile:** Manage personal and business information. Allow the user to set their unique "Betweena ID" *only once*.
    *   **Payments:** Add and manage withdrawal methods (Mobile Money and Bank Account). Simulate fetching the account name after a number is entered to build trust.
    *   **Referrals:** Allow the user to customize their referral code *only once*. Include a prominent warning about the consequences.
    *   **Subscription:** Show the user's current plan ("Free" or "Pro"). Display a comparison between the plans and include an "Upgrade to Pro" button.
    *   **Settings:** Manage app theme and password. Include a "Delete Account" section.

---

## 5. Code Quality & Structure

*   **File Paths:** Add a comment at the top of every file indicating its full path (e.g., `// /src/app/page.tsx`).
*   **Component Modularity:** Create small, reusable components. For example, the dashboard page should be composed of smaller components like `SummaryCards`, `ReferralRanks`, etc.
*   **Services:** Abstract mock data access into a `services` layer (e.g., `src/lib/services/deals.service.ts`).
*   **Error Handling:** Ensure the application gracefully handles cases where data is not found (e.g., a non-existent deal ID).
*   **Environment Variables:** Use a `.env` file for all Firebase credentials and ensure the application reads from `process.env`. Do not hardcode credentials.
