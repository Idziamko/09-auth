import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import { notFound } from 'next/navigation';

interface FilteredNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: FilteredNotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || 'all';
  const filterLabel = tag === 'all' ? 'All Notes' : tag;

  return {
    title: `${filterLabel} | NoteHub`,
    description: `Browse notes filtered by ${filterLabel} on NoteHub.`,
    openGraph: {
      title: `${filterLabel} | NoteHub`,
      description: `Browse notes filtered by ${filterLabel} on NoteHub.`,
      url: `/notes/filter/${tag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function FilteredNotesPage({ params }: FilteredNotesPageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const rawTag = slug[0];
  const tag = rawTag !== 'all' ? rawTag : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={rawTag} />
    </HydrationBoundary>
  );
}
