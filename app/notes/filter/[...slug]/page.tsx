import type { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: FilterPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug[0];

  const title = tag === "all" ? "All notes" : `Notes filtered by ${tag}`;
  const description =
    tag === "all"
      ? "Browse all your notes in NoteHub."
      : `Browse notes filtered by the "${tag}" tag in NoteHub.`;

  return {
    title: `${title} | NoteHub`,
    description,
    openGraph: {
      title: `${title} | NoteHub`,
      description,
      url: `https://08-zustand-six-flax.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
};

const FilterNotesPage = async ({ params }: FilterPageProps) => {
  const { slug } = await params;
  const tag = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default FilterNotesPage;
