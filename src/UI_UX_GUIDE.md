<!-- /UI_UX_GUIDE.md -->
# Betweena: UI/UX Design Guide

This document serves as the single source of truth for the user interface (UI) and user experience (UX) design of the Betweena application. Its purpose is to ensure consistency, quality, and a shared understanding of our design philosophy as the platform evolves.

## 1. Core Philosophy

The entire user experience is built on three pillars:

1.  **Trust and Clarity**: Every interaction must build user confidence. The UI must be transparent, professional, and unambiguous. We avoid jargon and make complex financial operations feel safe and understandable.
2.  **Action-Oriented Design**: The application should proactively guide users to what they need to do next. Dashboards and key pages should highlight required actions, reducing cognitive load and preventing missed steps.
3.  **Simplicity and Efficiency**: We streamline complex processes like deal creation and amendments into simple, intuitive steps.

## 2. Style and Branding

### Color Palette

The color scheme is designed to feel professional, trustworthy, and clean.

-   **Primary (`#3399FF` / `hsl(210, 70%, 50%)`):** A vibrant, confident blue used for primary actions, active states, and key highlights.
-   **Background (`#F0F5FF` / `hsl(210, 20%, 95%)`):** A light, desaturated blue that provides a clean and calming backdrop.
-   **Accent (`#33CCCC` / `hsl(180, 60%, 40%)`):** An energetic cyan used for secondary highlights and drawing attention to specific features.
-   **Destructive (`hsl(0, 84.2%, 60.2%)`):** A standard red reserved for warning messages and destructive actions (e.g., Delete, Raise Dispute).

### Typography

-   **Body Font:** `Inter`, a clean and highly readable sans-serif font used for all body text, labels, and descriptions.
-   **Headline Font:** `Inter` (Bold weight). A dedicated bold style is applied to all major headings (`<h1>`, `CardTitle`) to create a clear visual hierarchy and improve scannability.

### Iconography

-   **Library:** We exclusively use `lucide-react` for all icons to maintain a consistent, modern, and lightweight visual language.
-   **Usage:** Icons are used to reinforce actions (e.g., `PlusCircle` for "Add"), provide visual context (e.g., `Wallet` on the dashboard), and improve the scannability of lists and navigation.

## 3. Core User Flows & UX Patterns

### Deal Lifecycle

Our deal lifecycle is designed to be clear and secure, with distinct states that inform both parties of the deal's progress.

1.  **Creation**: A deal is initiated by one party and sent to the other for acceptance.
2.  **inHolding**: Once the deal is accepted and funded by the buyer, the money is secured by Betweena. The deal status is "On Hold" (`inHolding`), and the seller is notified to begin work.
3.  **delivered**: The seller completes their work and marks the deal as delivered. The status changes to "Delivered", and the buyer is notified.
4.  **in_review**: The deal is now in the buyer's hands. The status is "In Review". The buyer must verify that the goods/services meet the acceptance criteria.
5.  **completed**: The buyer accepts the delivery, and the funds are released to the seller. The deal is marked as "Completed".
6.  **dispute**: If there's a disagreement, either party can raise a dispute, pausing the deal and flagging it for manual intervention.

### Deal Creation

-   **Multi-Step Process:** The flow is broken down into logical steps with a progress bar to manage user expectations.
-   **Flexible Party Invitation:** Users can initiate a deal with a counterparty using their **Email**, **Phone Number**, or unique **Betweena ID**, providing flexibility and privacy.

### Deal Management

-   **Action-Oriented Dashboard:** The dashboard's primary role is to surface "Deals Needing Your Attention". This card highlights deals in `in_review` (prompting the buyer to release funds) and `dispute` statuses.
-   **Clear Action Buttons:** On the deal details page, buttons are dynamically shown based on the user's role and the deal's status.
    -   Seller sees **"I Have Delivered"** when the deal is `inHolding`.
    -   Buyer sees **"Accept & Release Money"** when the deal is `in_review`.
-   **Vertical Timeline History:** On the deal details page, a clear vertical timeline visually represents the deal's history, with the most recent event highlighted, making the deal status instantly understandable.
-   **Inactive Deal Visuals:** For `completed` or `cancelled` deals, a visual overlay is applied to the deal image to signify that the deal is closed.

### Identity and Profile Management

-   **Betweena ID:** Each user has a unique, customizable Betweena ID (e.g., `@username`). This acts as their public identifier on the platform. The ID can only be customized once, a fact which is communicated to the user in a confirmation dialog.
-   **Referral System:** The referral code can also be customized once. The UI includes a prominent warning in the "Referral" tab explaining that changing the code will sever ties to previous referrals.
-   **Payment Methods:** Users can manage their withdrawal methods in a dedicated "Payments" tab.
    -   **Verified Names:** For both Mobile Money and Bank Accounts, the system simulates fetching the registered account name after the user enters their number. This prevents typos and builds trust. The name field is read-only.

## 4. Component Library (ShadCN UI)

We use a customized version of `ShadCN UI` for our component library. This provides a consistent, accessible, and theme-able foundation for the entire application. Key components and their usage include:

-   **Card:** The primary container for grouping related information (e.g., Dashboard widgets, profile sections). `CardTitle` is always styled with the bold headline font.
-   **Button:** Used for all actions. Variants (`default`, `outline`, `destructive`) are used consistently to signal the nature of the action.
-   **AlertDialog:** Used for critical, user-initiated confirmations that have consequences, such as locking a referral code, raising a dispute, or releasing funds. This ensures the user consciously confirms their action.
-   **Dialog:** Used for standard modal actions like "Add Funds" or "Add Payment Method", where the actions are less critical or destructive.
-   **Tabs:** Used to organize complex pages with multiple sections, such as the Profile page.
-   **Input:** Standardized input fields, often enhanced with icons for better context (e.g., `AtSign` for Betweena ID).
-   **Badge:** Used to display status labels (e.g., Deal Status) with colors mapped to their meaning for quick visual identification.
-   **Tooltip:** Provides additional information on hover, such as for disabled buttons or icon-only actions.
