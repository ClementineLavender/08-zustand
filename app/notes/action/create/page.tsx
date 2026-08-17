import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNotePage.module.css";

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note",
  openGraph: {
    title: "Create note",
    description: "Create a new note",
    url: "https://notehub.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-09-meta.jpg",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.container}>
      <h1>Create note</h1>
      <NoteForm />
    </main>
  );
}