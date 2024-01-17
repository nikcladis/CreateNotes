import { useEffect, useState } from "react";
import { Note } from "@/models/note";
import { fetchData } from "@/api/notesApi";

interface UseFetchNotesResult {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const useFetchNotes = (): UseFetchNotesResult => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetchData("/api/notes/", {
          method: "GET",
        });

        const fetchedNotes: Note[] = await response.json();
        setNotes(fetchedNotes);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return { notes, loading, error };
};

export default useFetchNotes;
