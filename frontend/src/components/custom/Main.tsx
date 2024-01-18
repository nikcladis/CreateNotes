import Note from "@/components/custom/Note";
import useFetchNotes from "@/hooks/useFetchNotes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CreateNoteModal from "./CreateNoteModal";
import { useRecoilState } from "recoil";
import { notesState } from "@/atoms/atoms";
import { useEffect } from "react";

const Main = () => {
  const { notes, loading, error } = useFetchNotes();
  const [notesList, setNoteList] = useRecoilState(notesState);

  useEffect(() => {
    if (notes) {
      setNoteList(notes);
    }
  }, [notes, setNoteList]);

  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <main className="p-4">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <main className="p-4">
      <div className="flex mb-4 mr-4 justify-end">
        <CreateNoteModal />
      </div>
      <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {notesList.map((note) => {
          return <Note key={note._id} note={note} />;
        })}
      </article>
    </main>
  );
};
export default Main;
