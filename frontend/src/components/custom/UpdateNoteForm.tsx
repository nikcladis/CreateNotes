import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useUpdateNote from "@/hooks/useUpdateNote";
import { useSetRecoilState } from "recoil";
import { notesState } from "@/atoms/atoms";
import { useRef } from "react";
import { Note } from "@/models/note";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  text: z.optional(z.string()),
});

interface UpdateNoteFormProps {
  initialNote: Note;
}

export function UpdateNoteForm({ initialNote }: UpdateNoteFormProps) {
  const { updateNote, loading, error } = useUpdateNote();
  const setUpdateNoteToDisplay = useSetRecoilState(notesState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialNote,
  });

  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedNote = await updateNote(initialNote._id, values);
    if (updatedNote) {
      setUpdateNoteToDisplay((notes) =>
        notes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
      );
      if (dialogCloseRef.current) {
        dialogCloseRef.current.click();
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea className="max-h-[300px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isDirty}>
          {!loading && "Save"}
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
        <DialogClose ref={dialogCloseRef} />
      </form>
    </Form>
  );
}

export default UpdateNoteForm;
