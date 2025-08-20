
# Betweena: Secure Escrow for Social Commerce & Freelancers

Welcome to the Betweena project repository. This document provides instructions for setting up and running the project locally, as well as deploying it to Vercel.

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
*   A Firebase project for authentication and backend services.

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
    *   You will also need to add your Google Apps Script URL to the environment variables for the waitlist form to function. A key variable is `NEXT_PUBLIC_SITE_URL` which should be set to `https://betweena.app`.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Deployment to Vercel

This project is optimized for deployment to **Vercel**, the platform from the creators of Next.js.

### Prerequisites

1.  **Vercel Account:** Create a free account at [vercel.com](https://vercel.com).
2.  **Git Repository:** Your project should be in a Git repository (e.g., on GitHub, GitLab, or Bitbucket).

### Automated Deployment Steps (Recommended)

1.  **Import Project:**
    *   Log in to your Vercel dashboard.
    *   Click "Add New..." and select "Project".
    *   Connect your Git provider and import the repository for this project.

2.  **Configure Environment Variables:**
    *   During the import process, Vercel will prompt you to configure your project.
    *   Go to the "Environment Variables" section.
    *   Add all the variables from your local `.env.local` file (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_SITE_URL`, etc.). Vercel will use these for the production build.
    *   **This is a critical step.** Your application will not connect to Firebase without these variables.

3.  **Deploy via Git Push:**
    *   Once your project is set up, you do not need to run any special commands to deploy.
    *   Simply commit your changes and push them to your main branch:
        ```bash
        git add .
        git commit -m "My latest changes"
        git push
        ```
    *   Vercel will automatically detect the push, build your project in the cloud, and deploy it.

**Important:** You do not need to run `vercel deploy` or other CLI commands from your local machine. This can cause build errors like the one you saw. The Git-based workflow is the standard and most reliable method for Vercel.
