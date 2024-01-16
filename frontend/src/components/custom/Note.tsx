import moment from "moment";
import { Note as NoteModel } from "../../models/note";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Trash2 } from "lucide-react";

interface NoteProps {
  note: NoteModel;
}

const formatCreatedAt = (createdAt: string): string => {
  return moment(createdAt).format("dddd D MMMM YYYY, h:mm:ss a");
};

const Note = ({ note }: NoteProps) => {
  return (
    <Card className="flex-grow md:max-w-[350px]">
      <CardHeader className="relative">
        <CardTitle>{note.title}</CardTitle>
        <button className="absolute top-4 right-4 cursor-pointer">
          <Trash2 size={18} />
        </button>
      </CardHeader>
      <CardContent>{note?.text}</CardContent>
      <CardFooter className="text-sm">
        {formatCreatedAt(note.createdAt)}
      </CardFooter>
    </Card>
  );
};

export default Note;
