import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from "@/types/note";

export interface DraftNote {
  title: string;
  content: string;
  tag: string;
  notetag: NoteTag | null;
}

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
  notetag: null,
};

interface NoteStore {
  draft: DraftNote;
  setDraft: (draft: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (partial) =>
        set((state) => ({
          draft: { ...state.draft, ...partial },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    }
  )
);