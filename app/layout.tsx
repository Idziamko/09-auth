import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { TanStackProvider } from '@/components/TanStackProvider/TanStackProvider';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub is a simple and efficient application for managing personal notes. Keep your thoughts organized and accessible.',
  openGraph: {
    title: 'NoteHub',
    description:
      'NoteHub is a simple and efficient application for managing personal notes. Keep your thoughts organized and accessible.',
    url: 'https://08-zustand-one-jet.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}