'use client';

import { useQuery } from '@tanstack/react-query';
import css from './NotePreview.module.css';

import { fetchNoteById } from '@/lib/api';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <div className={css.container}>Loading note details...</div>;
  }

  if (isError || !note) {
    return <div className={css.container}>Failed to load note preview.</div>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>Tag: {note.tag}</p>
        <div className={css.content}>{note.content}</div>
      </div>
    </div>
  );
}
