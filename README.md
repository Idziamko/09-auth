# NoteHub

This is my solution for the "08-zustand" homework. NoteHub is a simple application for managing
personal notes, built with Next.js (App Router).

## Features

- View all notes, filter by tag (Todo, Work, Personal, Meeting, Shopping)
- View note details on a separate page
- Create new notes with a dedicated form page
- Draft functionality: the create note form automatically saves your progress as a draft in
  `localStorage`. If you cancel and come back, your text is still there!
- SEO optimized with metadata and Open Graph tags for all pages
- Styled with CSS Modules
- Global font configuration using `next/font/google` (Roboto)

## Technologies Used

- **Next.js 14+** (App Router)
- **React 19**
- **TypeScript** for static typing
- **Zustand** + `persist` middleware for draft state management
- **TanStack Query** (React Query) for fetching and caching API data
- **Axios** for HTTP requests
- **CSS Modules** for component-scoped styling

## Setup & Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root folder and add your API token:
   ```env
   NEXT_PUBLIC_NOTEHUB_TOKEN=your_token_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable UI components (not tied directly to routes)
- `/lib/api.ts` - Axios setup and API requests
- `/lib/store/noteStore.ts` - Zustand store for draft functionality
- `/types` - TypeScript interfaces

Code is formatted with Prettier.
