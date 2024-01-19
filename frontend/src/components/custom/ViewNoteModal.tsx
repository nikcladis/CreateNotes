import { useState, forwardRef, useImperativeHandle } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Note as NoteModel } from "@/models/note";
import { FilePenLine } from "lucide-react";
import UpdateNoteForm from "@/components/custom/UpdateNoteForm";

interface ViewNoteModalProps {
  note: NoteModel;
}

export interface ViewNoteModalRef {
  openModal: () => void;
  closeModal: () => void;
}

const ViewNoteModal = forwardRef<ViewNoteModalRef, ViewNoteModalProps>(
  ({ note }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      openModal,
      closeModal,
    }));

    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="md:max-w-[700px] max-w-[90%] max-h-[90%] rounded-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-start text-2xl">
              <FilePenLine size={25} className="mr-2 mt-0.5" />
              <span>Edit Note</span>
            </DialogTitle>
            <Separator />
          </DialogHeader>
          <UpdateNoteForm initialNote={note} />
        </DialogContent>
      </Dialog>
    );
  }
);

export default ViewNoteModal;
