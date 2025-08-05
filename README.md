<!-- /README.md -->
# Betweena: Secure Escrow for Social Commerce & Freelancers

Welcome to the Betweena project repository. This document provides instructions for setting up and running the project locally, as well as deploying it to Firebase.

For a comprehensive overview of the project's features, user flows, and technical requirements, please see the **[Project Brief & Requirements](./PROJECT_BRIEF.md)**.

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

---

## Connecting a Custom Domain

To connect your custom domain, follow the detailed instructions in the [Firebase Hosting documentation](https://firebase.google.com/docs/hosting/custom-domain). The process involves:
1.  Adding your custom domain in the Firebase Console.
2.  Verifying domain ownership by adding a TXT record to your DNS settings.
3.  Adding A records provided by Firebase to your DNS settings to point your domain to Firebase's servers.
