import { useState } from "react";
import { fetchData } from "@/api/notesApi";

interface UseDeleteNoteResult {
  deleteNote: (noteId: number) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const useDeleteNote = (): UseDeleteNoteResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteNote = async (noteId: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetchData(`/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setLoading(false);
        return true;
      } else {
        setError(`Failed to delete note with ID: ${noteId}`);
        setLoading(false);
        return false;
      }
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
      return false;
    }
  };

  return { deleteNote, loading, error };
};

export default useDeleteNote;
