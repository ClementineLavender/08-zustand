import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note",
  openGraph: {
    title: "Create note",
    description: "Create a new note",
    url: "/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-09-meta.jpg",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main>
      <div>
        <h1>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}