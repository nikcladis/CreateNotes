// /hooks/useCreateNote.ts
import { useState } from "react";
import { Note } from "@/models/note";
import { fetchData } from "@/api/notesApi";

interface UseCreateNoteResult {
  createNote: (note: NoteInput) => Promise<Note | null>;
  loading: boolean;
  error: string | null;
}

interface NoteInput {
  title: string;
  text?: string;
}

const useCreateNote = (): UseCreateNoteResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createNote = async (note: NoteInput): Promise<Note | null> => {
    setLoading(true);
    try {
      const response = await fetchData("/api/notes/", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const createdNote: Note = await response.json();
      setLoading(false);
      return createdNote;
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
      return null;
    }
  };

  return { createNote, loading, error };
};

export default useCreateNote;
