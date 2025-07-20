# Betweena: UI/UX Design Guide

This document serves as the single source of truth for the user interface (UI) and user experience (UX) design of the Betweena application. Its purpose is to ensure consistency, quality, and a shared understanding of our design philosophy as the platform evolves.

## 1. Core Philosophy

The entire user experience is built on three pillars:

1.  **Trust and Clarity**: Every interaction must build user confidence. The UI must be transparent, professional, and unambiguous. We avoid jargon and make complex financial operations feel safe and understandable.
2.  **Action-Oriented Design**: The application should proactively guide users to what they need to do next. Dashboards and key pages should highlight required actions, reducing cognitive load and preventing missed steps.
3.  **Simplicity and Efficiency**: We streamline complex processes like deal creation and amendments into simple, intuitive steps. Features like "Smart Start" (AI Assistant) are designed to make the user's workflow as efficient as possible.

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

### Deal Creation

-   **Multi-Step Process:** The flow is broken down into logical steps with a progress bar to manage user expectations.
-   **AI-Assisted "Smart Start":** To reduce friction, users can describe their deal in natural language, and the AI will pre-fill the form fields, turning a manual task into a quick review.
-   **Flexible Party Invitation:** Users can initiate a deal with a counterparty using their **Email**, **Phone Number**, or unique **Betweena ID**, providing flexibility and privacy.

### Deal Management

-   **Action-Oriented Dashboard:** The dashboard's primary role is to surface "Deals Needing Your Attention" (e.g., those requiring funding or in dispute), directing the user to their most urgent tasks.
-   **Vertical Timeline History:** On the deal details page, a clear vertical timeline visually represents the deal's history, with the most recent event highlighted, making the deal status instantly understandable.
-   **Amendment System:** Instead of a simple "edit," changes to an active deal are handled through a formal "Amendment Proposal" system. This ensures that both parties must agree to any changes, maintaining the integrity of the agreement. The "Amend Deal" button is only available for deals in `funding` or `in_escrow` states.

### Identity and Profile Management

-   **Betweena ID:** Each user has a unique, customizable Betweena ID (e.g., `@username`). This acts as their public identifier on the platform, allowing them to make deals without exposing personal contact information. The ID can only be customized once.
-   **Referral System:** Referrals are treated as a distinct feature from the user's identity. The referral system is housed in its own dedicated "Referral" tab on the profile page, complete with clear warnings about the consequences of changing a referral code.
-   **Payment Methods:** Users can manage their withdrawal methods (Bank Account, Mobile Money) in a dedicated "Payments" tab. The UI gracefully handles cases where no payment methods have been added, guiding the user to add one.

## 4. Component Library (ShadCN UI)

We use a customized version of `ShadCN UI` for our component library. This provides a consistent, accessible, and theme-able foundation for the entire application. Key components and their usage include:

-   **Card:** The primary container for grouping related information (e.g., Dashboard widgets, profile sections). `CardTitle` is always styled with the bold headline font.
-   **Button:** Used for all actions. Variants (`default`, `outline`, `destructive`) are used consistently to signal the nature of the action.
-   **Dialog / AlertDialog:** Used for modal actions like confirming a withdrawal, raising a dispute, or using the "Smart Start" feature.
-   **Tabs:** Used to organize complex pages with multiple sections, such as the Profile page.
-   **Input:** Standardized input fields, often enhanced with icons for better context (e.g., `AtSign` for Betweena ID).
-   **Badge:** Used to display status labels (e.g., Deal Status, Transaction Status) with colors mapped to their meaning.
-   **Tooltip:** Provides additional information on hover, such as for disabled buttons or icon-only actions.
