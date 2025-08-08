<!-- /Userflow.md -->
# Betweena: Detailed User Flow

*This document provides a step-by-step breakdown of the user journey through the Betweena application. It is intended for developers to understand the sequence of events, key data requirements, and the purpose of each screen.*

---

## 1. Authentication Flow

This flow covers how new users sign up and existing users sign in.

1.  **Landing Page (`/`):**
    *   The user first arrives at the public marketing page.
    *   They can click "Sign Up" or "Get Started" to create an account, or "Login" to sign in.

2.  **Sign Up (`/signup`):**
    *   **Action:** The user fills out the registration form (Full Name, Email, Password) and agrees to the Terms of Service.
    *   **Alternative:** The user can choose to sign up using a social provider (e.g., Google).
    *   **System Response:**
        *   The system creates a new user account in Firebase Authentication.
        *   Upon successful creation, the user is automatically logged in.
        *   The user is immediately redirected to the `/onboarding` flow to complete their profile setup.

3.  **Login (`/login`):**
    *   **Action:** An existing user enters their email and password.
    *   **Alternative:** The user can sign in with Google.
    *   **System Response:**
        *   The system verifies the credentials with Firebase Authentication.
        *   Upon successful login, the user is redirected to their main `/dashboard`.

---

## 2. Onboarding Flow

This is a mandatory, one-time setup process for new users immediately after they sign up.

1.  **Welcome Screen (`/onboarding`, Step 1):**
    *   A simple welcome message to introduce the setup process.

2.  **Personal Details (Step 2):**
    *   **Action:** The user provides their full name (pre-filled from sign-up) and date of birth.
    *   **Purpose:** Required for identity verification (KYC) in a real-world scenario.

3.  **Business Details (Step 3):**
    *   **Action:** The user provides information about their business, such as Business Name, Role, Industry, and main products/services.
    *   **Purpose:** Helps tailor the user experience and understand our user base.

4.  **Payout Method (Step 4):**
    *   **Action:** The user adds their preferred method for receiving money (payouts). They can choose between Mobile Money or a Bank Account and enter the relevant details.
    *   **Purpose:** To enable payouts after a deal is successfully completed. This information is stored securely.

5.  **Completion (Step 5):**
    *   **Action:** The user sees a confirmation screen and clicks "Go to Dashboard".
    *   **System Response:** The user is redirected to the main `/dashboard`, and the onboarding process is marked as complete for this user.

---

## 3. Core Application (Dashboard)

This is the main, authenticated part of the application. All views are nested within the `/dashboard` layout.

### 3.1. Main Dashboard (`/dashboard`)

*   **View:**
    *   Displays summary cards for "Your Balance" and "Money on Hold".
    *   A prominent "Deals Needing Your Attention" section highlights deals with `in_review` or `dispute` statuses.
    *   A "Referral Ranks" card shows a leaderboard to encourage sharing.
    *   A list of "Recent Transactions" provides a quick overview of wallet activity.
*   **Purpose:** To give the user an at-a-glance overview of their financial status and any required actions.

### 3.2. Deals Management (`/dashboard/deals`)

*   **List View (`/`):**
    *   **View:** Displays a table of all the user's deals. Users can search by title/party and filter by status or role (buyer/seller).
    *   **Action:** Clicking on any deal navigates the user to the Deal Detail View.
    *   **Action:** Clicking "Start a New Deal" navigates to the Create Deal flow.

*   **Create Deal (`/create`):**
    *   **View:** A multi-step form guides the user through creating a new deal.
    *   **Steps:**
        1.  **Your Role:** Choose "Buyer" or "Seller".
        2.  **Deal Details:** Enter title, description, and upload images. Define the "Acceptance Criteria" (the definition of done).
        3.  **Counterparty:** Enter the other person's contact info (Email, Phone, or Betweena ID).
        4.  **Amount & Terms:** Set the deal amount and an optional deadline/location.
        5.  **Review:** A summary of all details is shown.
    *   **Action:** User clicks "Confirm and Send".
    *   **System Response:** A new deal is created with a `pending` status. A notification is sent to the counterparty. The user is redirected back to the deals list.

*   **Deal Detail View (`/[id]`):**
    *   **View:** This is the central hub for a single deal. It displays:
        *   All deal details (amount, deadline, etc.).
        *   The status of the Acceptance Criteria.
        *   A "History" timeline showing every event in the deal's lifecycle.
        *   A message log for communication between parties.
    *   **Dynamic Actions:** The user sees different action buttons based on the deal's `status` and their `role`.
        *   **Buyer, `pending` status:** "Accept & Fund", "Request Edits", "Reject".
        *   **Seller, `inHolding` status:** "Mark as Delivered".
        *   **Buyer, `in_review` status:** "Accept & Release Money", "Raise a Dispute".
        *   And so on for other statuses like `dispute` resolution.

### 3.3. Wallet (`/dashboard/wallet`)

*   **View:**
    *   Displays the total amount of "Money on Hold" across all active deals.
    *   Shows a detailed, filterable history of all transactions (deal fundings, payouts, etc.).
*   **Purpose:** Provides a clear and complete financial record for the user.

### 3.4. Profile (`/dashboard/profile`)

*   **View:** A tabbed interface for managing user and account settings.
    *   **Profile:** Edit personal and business information. Set a unique "Betweena ID" (can only be done once).
    *   **Payments:** Add or remove payout methods (Mobile Money, Bank).
    *   **Referrals:** Customize the user's referral code (can only be done once).
    *   **Subscription:** View current plan (Free/Pro) and upgrade.
    *   **Settings:** Manage app theme, change password, and delete the account.
