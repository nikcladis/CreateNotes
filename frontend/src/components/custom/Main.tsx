import { FilePlus2 } from "lucide-react";
import Note from "@/components/custom/Note";
import { Button } from "@/components/ui/button";
import useFetchNotes from "@/hooks/useFetchNotes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CreateNoteModal from "./CreateNoteModal";

const Main = () => {
  const { notes, loading, error } = useFetchNotes();

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
      <article className="flex flex-col md:flex-row flex-wrap gap-3">
        {notes.map((note) => {
          return <Note key={note._id} note={note} />;
        })}
      </article>
    </main>
  );
};
export default Main;
