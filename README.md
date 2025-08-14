
# Betweena: Secure Escrow for Social Commerce & Freelancers

Welcome to the Betweena project repository. This document provides instructions for setting up and running the project locally, as well as deploying it to Firebase.

For a comprehensive overview of the project's features, user flows, and technical requirements, please see the **[Project Brief & Requirements](./PROJECT_BRIEF.md)**.

---

## Key Features & Structure

This application is a full-featured prototype for an escrow service, built with a modern tech stack.

### Technology Stack
*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **UI:** React with shadcn/ui components and Tailwind CSS
*   **Authentication:** Firebase (Email/Password & Google Sign-In)
*   **Database (Mock):** In-memory data services located in `src/lib/services/`.

### Core Application (`/src/app/dashboard`)
The main authenticated part of the app is a user dashboard with the following features:
*   **Onboarding Flow:** A multi-step process for new users to set up their profile and payment details.
*   **Deal Management:** Users can create, view, and manage escrow deals, each with a detailed status timeline and messaging.
*   **Wallet:** A view to track funds currently held in escrow and see a full transaction history.
*   **Profile Management:** A tabbed interface for users to update their profile, manage payment methods, customize their referral code, and adjust app settings.

### The Landing Page (`/src/app/page.tsx`)
The public-facing marketing page is designed to be engaging and drive waitlist sign-ups. It has been fully modularized for maintainability.

*   **Modular Architecture:** The main page component at `src/app/page.tsx` is a simple assembly of smaller, dedicated components located in the `src/components/landing/` directory. This separation of concerns makes the code easier to manage and update.
*   **Key Components:**
    *   `hero-section.tsx`: The main "above-the-fold" content with the primary call-to-action.
    *   `how-it-works-section.tsx`: A step-by-step visual guide to the escrow process.
    *   `testimonials-section.tsx`: An auto-scrolling carousel of user testimonials to build social proof.
    *   `waitlist-section.tsx`: A functional waitlist form that submits data directly to a Google Apps Script, which then populates a Google Sheet and sends a confirmation email.
    *   `faq-section.tsx`: An interactive, collapsible FAQ section to address common user questions.
    *   `footer.tsx`: A consistent site footer with social and legal links.

---

## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn
*   A Firebase project

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/iamireku/betweena.git
    cd betweena
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
    *   You will also need to add your Google Apps Script URL to the environment variables for the waitlist form to function.

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

2.  **Connect to Your Firebase Project:**
    Run `firebase use --add` and select your project.

3.  **Build the Application:**
    ```bash
    npm run build
    ```

4.  **Deploy:**
    This command will upload your build to Firebase App Hosting.
    ```bash
    firebase apphosting:backends:deploy --id betweena-backend --region us-central1
    ```

After the command finishes, it will give you the live URL for your application.
