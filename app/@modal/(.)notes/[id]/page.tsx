import NotePreviewClient from "./NotePreview.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";


interface NotePreviewPageProps {
  params: Promise<{ id: string }>;
}

const NotePreviewPage = async ({ params }: NotePreviewPageProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  })

  return (
  <HydrationBoundary state={dehydrate(queryClient)}>
    <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
};

export default NotePreviewPage;
