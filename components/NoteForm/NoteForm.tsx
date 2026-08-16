'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';
import { NoteTag } from '@/types/note';
import { useNoteStore } from '@/lib/store/noteStore';

import css from './NoteForm.module.css';

const TAGS: NoteTag[] = [
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Todo',
];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Додаємо стан для відстеження завантаження на клієнті
  const [isMounted, setIsMounted] = useState(false);

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
  }>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      clearDraft();
      router.back();
    },
  });

  const validate = () => {
    const nextErrors: {
      title?: string;
      content?: string;
    } = {};

    if (!draft.title.trim()) {
      nextErrors.title = 'Title is required';
    } else if (draft.title.length < 3) {
      nextErrors.title = 'Title must be at least 3 characters';
    } else if (draft.title.length > 50) {
      nextErrors.title = 'Title must be at most 50 characters';
    }

    if (draft.content.length > 500) {
      nextErrors.content =
        'Content must be at most 500 characters';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validate()) return;

    mutation.mutate(draft);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    router.back();
  };

  // Поки компонент не змонтований у браузері, не рендеримо форму (уникаємо помилки Hydration)
  if (!isMounted) return null;

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
        />

        {errors.title && (
          <span className={css.error}>
            {errors.title}
          </span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">
          Tag
        </label>

        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          {TAGS.map((tag) => (
            <option
              key={tag}
              value={tag}
            >
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">
          Content
        </label>

        <textarea
          id="content"
          name="content"
          rows={5}
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
        />

        {errors.content && (
          <span className={css.error}>
            {errors.content}
          </span>
        )}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={css.submitButton}
        >
          {mutation.isPending
            ? 'Saving...'
            : 'Create Note'}
        </button>
      </div>
    </form>
  );
}