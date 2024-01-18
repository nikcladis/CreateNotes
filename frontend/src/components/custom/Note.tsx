import moment from "moment";
import { Note as NoteModel } from "../../models/note";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import useDeleteNote from "@/hooks/useDeleteNote";
import { useSetRecoilState } from "recoil";
import { notesState } from "@/atoms/atoms";

interface NoteProps {
  note: NoteModel;
}

const formatCreatedAt = (createdAt: string): string => {
  return moment(createdAt).format("dddd D MMMM YYYY, h:mm:ss a");
};

const Note = ({ note }: NoteProps) => {
  const { deleteNote, loading, error } = useDeleteNote();
  const setDeleteNoteFromDisplay = useSetRecoilState(notesState);

  const handleDeleteNote = async () => {
    const isDeleted = await deleteNote(note._id);
    if (isDeleted)
      setDeleteNoteFromDisplay((notes) =>
        notes.filter((n) => n._id !== note._id)
      );
  };

  return (
    <Card className="h-[180px] flex flex-col flex-grow overflow-hidden hover:cursor-pointer hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5 transition-colors duration-200 ease">
      <CardHeader className="relative">
        <CardTitle className="underline text-gray-800 dark:text-gray-300 font-bold decoration-zinc-400">
          {note.title}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleDeleteNote}
                  variant={"ghost"}
                  className="p-2.5"
                >
                  {loading && <ReloadIcon className="animate-spin" />}
                  {!loading && <Trash2 size={18} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-1">
                <p>Delete note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent
        style={{ whiteSpace: "pre-line" }}
        className="relative flex-grow overflow-hidden bg-gradient-to-b"
      >
        {note?.text}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:to-black to-white opacity-90" />
        <div className="absolute inset-0 shadow-lg" />
      </CardContent>
      <CardFooter className="mt-auto text-xs font-light text-gray-500 border-t bg-gray-500 bg-opacity-10 dark:bg-white dark:bg-opacity-5 py-2">
        {formatCreatedAt(note.createdAt)}
      </CardFooter>
    </Card>
  );
};

export default Note;
