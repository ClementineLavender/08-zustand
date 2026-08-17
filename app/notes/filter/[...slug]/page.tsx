import type { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag = rawTag === 'all' ? undefined : rawTag;

  const tagLabel = tag ? `${tag} notes` : 'All notes';

  return {
    title: tagLabel,
    description: `Browse ${tagLabel.toLowerCase()} in NoteHub`,
    openGraph: {
      title: tagLabel,
      description: `Browse ${tagLabel.toLowerCase()} in NoteHub`,
      url: `https://notehub.vercel.app/notes/filter/${rawTag ?? 'all'}`,
      images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-09-meta.jpg', width:1200, height:630, alt:'NoteHub' }],
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag = rawTag === 'all' ? undefined : rawTag;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <NotesClient tag={tag} />
      </div>
    </HydrationBoundary>
  );
}
