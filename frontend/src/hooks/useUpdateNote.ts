import { useState } from "react";
import { Note } from "@/models/note";
import { fetchData } from "@/api/notesApi";

interface UseUpdateNoteResult {
  updateNote: (id: number, note: NoteInput) => Promise<Note | null>;
  loading: boolean;
  error: string | null;
}

interface NoteInput {
  title?: string;
  text?: string;
}

const useUpdateNote = (): UseUpdateNoteResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateNote = async (
    id: number,
    note: NoteInput
  ): Promise<Note | null> => {
    setLoading(true);
    try {
      const response = await fetchData(`/api/notes/${id}`, {
        method: "PATCH",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedNote: Note = await response.json();
      setLoading(false);
      return updatedNote;
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
      return null;
    }
  };

  return { updateNote, loading, error };
};

export default useUpdateNote;
