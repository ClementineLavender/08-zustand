import { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const rawTag = slug?.[0];
  const decodedTag = rawTag ? decodeURIComponent(rawTag) : undefined;
  const tag = decodedTag === 'all' ? undefined : decodedTag;

  const titleTag = tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : 'All';

  return {
    title: `Notes - ${titleTag}`,
    description: `Filtered notes by tag: ${titleTag}`,
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  const rawTag = slug?.[0];
  const decodedTag = rawTag ? decodeURIComponent(rawTag) : undefined;
  const tag = decodedTag === 'all' ? undefined : decodedTag;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

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