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
import ProfileForm from "./CreateNoteForm";

const CreateNoteModal = () => {
  return (
    <CreateNoteDialog>
      <CreateNoteTooltip>
        <Button variant="secondary" className="p-2">
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
        <TooltipTrigger>{children}</TooltipTrigger>
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start text-2xl">Add Note</DialogTitle>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
};
