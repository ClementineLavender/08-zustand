import { NewNoteData, Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const getHeaders = () => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
};


export async function fetchNotes(page = 1, search?: string, tag?: string) {
  const searchParams = new URLSearchParams({
    page: String(page),
    perPage: '12',
  });

  if (search && search.trim() !== '') {
    searchParams.append('search', search);
  }

  if (tag && tag !== 'all') {
    searchParams.append('tag', tag);
  }

  const response = await fetch(`${BASE_URL}/notes?${searchParams.toString()}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }

  return response.json();
}


export async function fetchNoteById(id: string): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch note');
  }

  return response.json();
}


export async function createNote(noteData: NewNoteData): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    throw new Error('Failed to create note');
  }

  return response.json();
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to delete note');
  }

  return response.json();
}