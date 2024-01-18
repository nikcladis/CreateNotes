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

interface NoteProps {
  note: NoteModel;
}

const formatCreatedAt = (createdAt: string): string => {
  return moment(createdAt).format("dddd D MMMM YYYY, h:mm:ss a");
};

const Note = ({ note }: NoteProps) => {
  return (
    <Card className="flex flex-col flex-grow overflow-hidden">
      <CardHeader className="relative">
        <CardTitle>{note.title}</CardTitle>
        <div className="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"ghost"} className="p-2.5">
                  <Trash2 size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="mb-1">
                <p>Delete note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>{note?.text}</CardContent>
      <CardFooter className="mt-auto text-xs font-light text-gray-500 border-t bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5 py-2">
        {formatCreatedAt(note.createdAt)}
      </CardFooter>
    </Card>
  );
};

export default Note;
