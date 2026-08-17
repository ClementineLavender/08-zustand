import { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Додаємо генерацію метаданих (title, description, openGraph)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const title = note?.title ? `Note: ${note.title}` : `Note #${id}`;
    const description = note?.content
      ? note.content.slice(0, 150)
      : `Details and description for note ${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
    };
  } catch {
    return {
      title: 'Note Details',
      description: 'View note details',
      openGraph: {
        title: 'Note Details',
        description: 'View note details',
      },
    };
  }
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}