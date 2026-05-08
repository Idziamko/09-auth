# NoteHub

This is my solution for the "09-auth" homework. This project adds full authentication to the NoteHub application using Next.js App Router.

## Features

- User Registration and Login via custom backend API.
- Secure routing: only authenticated users can access `/profile` and `/notes` routes.
- Next.js Middleware protects private routes and redirects unauthenticated users to `/sign-in`.
- Global session state managed by Zustand.
- JWT tokens (accessToken, refreshToken) stored securely in cookies by the Next.js API routes.
- Profile view and edit pages.
- Log out functionality that clears session and cookies.

## Technologies

- **Next.js** (App Router)
- **React**
- **Zustand**
- **Axios**
- **CSS Modules**

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set the environment variable in `.env` (it will use localhost by default if not set, or your Vercel URL in production):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.
