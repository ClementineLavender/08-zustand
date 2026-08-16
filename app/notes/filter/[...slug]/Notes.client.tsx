'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

import css from './Notes.client.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({
  tag,
}: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] =
    useState('');

  const [debouncedSearchQuery] =
    useDebounce(searchQuery, 500);

  const { data } = useQuery({
    queryKey: [
      'notes',
      page,
      debouncedSearchQuery,
      tag,
    ],
    queryFn: () =>
      fetchNotes(
        page,
        debouncedSearchQuery,
        tag
      ),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (
    value: string
  ) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handlePageClick = (
    event: { selected: number }
  ) => {
    setPage(event.selected + 1);
  };

  const notes = data?.notes ?? [];
  const totalPages =
    data?.totalPages ?? 1;

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <Link
          href="/notes/action/create"
          className={css.button}
        >
          Create Note
        </Link>
      </div>

      <NoteList notes={notes} />

      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          onPageChange={handlePageClick}
          forcePage={page - 1}
        />
      )}
    </div>
  );
}