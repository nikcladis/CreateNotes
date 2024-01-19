import { FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import CreateNoteForm from "./CreateNoteForm";

const CreateNoteModal = () => {
  return (
    <CreateNoteDialog>
      <CreateNoteTooltip>
        <Button asChild variant="secondary" className="p-2 w-fit">
          <FilePlus2 size={20} />
        </Button>
      </CreateNoteTooltip>
    </CreateNoteDialog>
  );
};

export default CreateNoteModal;

const CreateNoteTooltip = ({ children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>Add note</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const CreateNoteDialog = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="md:max-w-[700px] max-w-[90%] max-h-[90%] rounded-md">
        <DialogHeader>
          <DialogTitle className="text-start text-2xl">Add Note</DialogTitle>
          <Separator />
        </DialogHeader>
        <CreateNoteForm />
      </DialogContent>
    </Dialog>
  );
};
