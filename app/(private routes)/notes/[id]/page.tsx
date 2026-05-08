import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    return {
      title: `${note.title} | NoteHub`,
      description: note.content.length > 160 ? note.content.slice(0, 157) + '...' : note.content,
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content.length > 160 ? note.content.slice(0, 157) + '...' : note.content,
        url: `/notes/${id}`,
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  } catch {
    return {
      title: 'Note not found | NoteHub',
      description: 'The requested note could not be found.',
    };
  }
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const resolvedParams = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', resolvedParams.id],
    queryFn: () => fetchNoteById(resolvedParams.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
