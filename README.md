# Blogy - Full Stack Next.js Blog

This project is a Next.js blog application with MongoDB, Authentication, and User Posts.

## Features
-   **Authentication**: Login/Register with email/password (NextAuth v5).
-   **Database**: MongoDB (Prisma ORM).
-   **CMS**: Create and publish posts.
-   **Design**: Original Blogyfy design preserved.

## Setup

1.  **Environment Variables**:
    Ensure `.env` contains:
    ```env
    DATABASE_URL="mongodb+srv://..."
    AUTH_SECRET="your_secret"
    ```

2.  **Dependencies**:
    ```bash
    npm install
    ```

3.  **Database Sync**:
    If starting fresh, push schema to MongoDB:
    ```bash
    npx prisma db push
    ```

4.  **Run**:
    ```bash
    npm run dev
    ```

## Pages
-   `/`: Home (displays posts from database).
-   `/login`: Sign in.
-   `/register`: Create an account.
-   `/create`: Create a new blog post (Authenticated users only).

## Deployment (Vercel)
1.  Push to GitHub.
2.  Import in Vercel.
3.  Add Environment Variables in Vercel Settings (`DATABASE_URL`, `AUTH_SECRET`).
    -   Generate a random string for `AUTH_SECRET` (e.g. `openssl rand -base64 32`).
